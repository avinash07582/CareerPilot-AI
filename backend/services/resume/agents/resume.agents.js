import { HumanMessage, SystemMessage } from "@langchain/core/messages"
import llm from "../config/llm.js"

//  export const resumeAgent = async(resumeText)=>{
//     const response = await llm.invoke([
//          new SystemMessage(`
// You are an Expert ATS Resume Analyzer.

// Analyze the given resume.

// Extract the following information:

// - Full Name
// - Email
// - Phone Number
// - Professional Summary
// - Technical Skills
// - Projects
// - Education
// - Experience
// - Strengths
// - Weaknesses
// - Missing Skills
// - Suggested Job Role
// - ATS Score (0-100)
// - Recommendations

// IMPORTANT RULES:

// 1. Return ONLY valid JSON.
// 2. Do not use markdown.
// 3. Do not explain anything.
// 4. Do not add extra text.
// 5. Every field must exist.

// Response Format:

// {
//   "name":"",
//   "email":"",
//   "phone":"",
//   "summary":"",
//   "skills":[],
//   "projects":[],
//   "education":[],
//   "experience":[],
//   "strengths":[],
//   "weaknesses":[],
//   "missingSkills":[],
//   "suggestedRole":"",
//   "score":0,
//   "recommendations":[]
// }
// `), new HumanMessage(resumeText)
//     ])
//     return response.content
//  }





export const resumeAgent = async (resumeText) => {
  const response = await llm.invoke([
    new SystemMessage(`
You are an Expert ATS Resume Analyzer.

Analyze the provided resume accurately, regardless of the
candidate's profession, education, industry, experience level,
or resume format.

Extract the following information:
- Full Name
- Email
- Phone Number
- Professional Summary
- Technical Skills
- Projects
- Education
- Experience
- Strengths
- Weaknesses
- Missing Skills
- Suggested Job Role
- ATS Score (0-100)
- Recommendations

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do not use Markdown, code fences, or explanations.
3. Every field in the response format must exist.
4. Do not invent or assume candidate information.
5. Use "" for unavailable string values.
6. Use [] for unavailable array values.
7. The ATS score must be a number between 0 and 100.
8. Base the analysis on the actual resume content.
9. Do not assume any particular degree, institution, company,
   job title, project, technology, or industry.
10. All array fields MUST contain strings only.
11. Never return objects or nested arrays inside array fields.
12. Convert each education entry into one descriptive string,
    preserving relevant available details.
13. Convert each project into one descriptive string,
    preserving relevant available details.
14. Convert each experience entry into one descriptive string,
    preserving relevant available details.
15. If an entry contains multiple details, combine them into
    a readable string without losing important information.
16. Do not fabricate details that are missing from the resume.
17. Skills must contain individual skill names as strings.
18. Strengths and weaknesses must be relevant to the resume.
19. Missing skills should be assessed in relation to the
    suggested role, without unsupported assumptions.
20. Recommendations must be relevant and actionable.
21. Suggest a job role based on the candidate's actual profile.
22. Evaluate the ATS score using resume clarity, structure,
    relevant skills, experience, achievements, and content.
23. Ensure the result can be parsed using JSON.parse().
24. Follow the response format exactly.

RESPONSE FORMAT:

{
  "name": "",
  "email": "",
  "phone": "",
  "summary": "",
  "skills": [],
  "projects": [],
  "education": [],
  "experience": [],
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestedRole": "",
  "score": 0,
  "recommendations": []
}
`),
    new HumanMessage(`
Analyze the following resume and return the result in the
required JSON format.

RESUME CONTENT:
${resumeText}
`),
  ]);

  const content = response.content;

  if (typeof content !== "string") {
    throw new Error("AI returned an unexpected response format");
  }

  return content;
};
