import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { OKRInput } from '@/types';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Llama sometimes returns raw, unescaped control characters (literal
 * newlines, tabs) inside JSON string values instead of \n / \t. That's
 * invalid JSON and makes JSON.parse throw "Bad control character in
 * string literal". This escapes control characters that appear *inside*
 * string literals only, leaving the JSON structure (outside strings)
 * untouched.
 */
function safeJsonParse<T>(text: string): T {
  let inString = false;
  let escaped = false;
  let result = '';
  for (const ch of text) {
    if (inString) {
      if (escaped) {
        result += ch;
        escaped = false;
      } else if (ch === '\\') {
        result += ch;
        escaped = true;
      } else if (ch === '"') {
        result += ch;
        inString = false;
      } else if (ch === '\n') {
        result += '\\n';
      } else if (ch === '\r') {
        result += '\\r';
      } else if (ch === '\t') {
        result += '\\t';
      } else if (ch.charCodeAt(0) < 0x20) {
        // Drop other stray control characters.
      } else {
        result += ch;
      }
    } else {
      result += ch;
      if (ch === '"') inString = true;
    }
  }
  return JSON.parse(result) as T;
}

export async function POST(req: NextRequest) {
  const input: OKRInput = await req.json();

  const prompt = `You are an expert product strategist. Generate exactly 3 OKRs for the following product context.

Product: ${input.productName}
Mission: ${input.mission}
Quarter: ${input.quarter}
Team focus: ${input.teamFocus}
${input.constraints ? `Constraints: ${input.constraints}` : ''}

Rules:
- Each Objective must be qualitative, aspirational and time-bound to the quarter
- Each Objective must have exactly 3 Key Results
- Each Key Result must be quantitative and measurable (include baseline, target, and unit)
- Key Results must be outcomes, not tasks or outputs
- Make the numbers realistic and specific, not round or vague
- Key Results should directly ladder up to the Objective

Return ONLY valid JSON in this exact format, no markdown:
{
  "objectives": [
    {
      "title": "Become the fastest onboarding experience in B2B payments",
      "description": "One sentence explaining why this objective matters this quarter.",
      "keyResults": [
        {
          "description": "Increase activation rate (users who complete first payment within 7 days of signup)",
          "baseline": "34",
          "target": "61",
          "unit": "%"
        },
        {
          "description": "Reduce median time-to-first-payment",
          "baseline": "4.2",
          "target": "1.8",
          "unit": "days"
        },
        {
          "description": "Achieve onboarding NPS score",
          "baseline": "22",
          "target": "45",
          "unit": "NPS"
        }
      ]
    }
  ]
}`;

  try {
    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      temperature: 0.4,
      max_tokens: 1800,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = completion.choices[0].message.content ?? '{}';
    const clean = raw.replace(/```json|```/g, '').trim();
    const parsed = safeJsonParse<Record<string, unknown>>(clean);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to generate OKRs' }, { status: 500 });
  }
}
