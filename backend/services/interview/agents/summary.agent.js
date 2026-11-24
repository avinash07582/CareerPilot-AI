import llm from "../config/llm.js"
// import hrInterviewPrompt from "../prompts/hrInterviewPrompt.js"
// import technicalInterviewPrompt from "../prompts/technicalInterviewPrompt.js"
import summaryPrompt from "../prompts/summaryPrompt.js"


export const summaryAgent = async (data) => {
  let response;

  try {
    response = await llm.invoke(summaryPrompt(data));

    const cleaned = response.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const report = JSON.parse(cleaned);
    report.overallScore = Number(report.overallScore) || 0;

    return report;
  } catch (error) {
    console.log("Summary Agent Error:", error.message);
    console.log("RAW:", response?.content);
    throw new Error("Failed to generate interview report.");
  }
};






// export const summaryAgent = async (data) => {
//   let response;
//   try {
//     response = await llm.invoke(summaryPrompt(data));

//     const cleaned = response.content
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     const report = JSON.parse(cleaned);
//     report.overallScore = Number(report.overallScore) || 0;
//     return report;
//   } catch (error) {
//     console.log("Summary Agent Error:", error.message);
//     console.log("RAW:", response?.content);
//     throw new Error("Failed to generate interview report.");
//   }
// };