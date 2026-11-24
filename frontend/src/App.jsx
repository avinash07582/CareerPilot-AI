import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../apis/user.api";
import Scorer from "./pages/Scorer";
import { getResume } from "../apis/resume.api.js";
import { useDispatch } from "react-redux";
import { setResume } from "./redux/resumeSlice.js";
import ResumeBulider from "./pages/ResumeBulider.jsx";
import InterviewStart from "./pages/InterviewStart.jsx";
import InterviewPage from "./pages/InterviewPage.jsx";
import InterviewReport from "./pages/InterviewReport.jsx";
import Roadmap from "./pages/Roadmap.jsx";
import Billing from "./pages/Billing.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

//  useEffect(() => {
//   const getUser = async () => {
//     try {
//       const data = await getCurrentUser();
//       setUser(data?.user);
//     } catch (error) {
//       if (error.response?.status !== 401) {
//     console.log(error.message);   // only log real errors
//   }
//   setUser(null);
      
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };
//   getUser();
// }, []);



//  useEffect(() => {
//   const getResumeData= async () => {
//     const response = await getResume()
//     // result ke response.data aa rha hai
//     dispatch(setResume(response?.data))
    
//   };
//   getResumeData()
  
// }, []);



  // Check authentication
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data?.user || null);
      } catch (error) {
        console.error("Authentication Error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // Fetch resume only after authentication
  useEffect(() => {
    if (!user) {
      dispatch(setResume(null));
      return;
    }

    const getResumeData = async () => {
      try {
        const response = await getResume();
        dispatch(setResume(response?.data || null));
      } catch (error) {
        console.error("Resume Error:", error);
      }
    };

    getResumeData();
  }, [user, dispatch]);



  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full z-9999">
        <div className="h-1 bg-black animate-pulse w-full" />
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Home setUser={setUser} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

<Route
          path="/scorer"
          element={
            user ? (
              <Scorer user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/resume"
          element={
            user ? (
              <ResumeBulider user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/interview"
          element={
            user ? (
              <InterviewStart user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/interview/:id"
          element={
            user ? (
              <InterviewPage user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/interview/:id/report"
          element={
            user ? (
              <InterviewReport user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/roadmap"
          element={
            user ? (
              <Roadmap user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />


        <Route
          path="/billing"
          element={
            user ? (
              <Billing user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />




      </Routes>
    </>
  );
};

export default App;










// import { Navigate, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Scorer from "./pages/Scorer";
// import ResumeBulider from "./pages/ResumeBulider.jsx";
// import InterviewStart from "./pages/InterviewStart.jsx";
// import InterviewPage from "./pages/InterviewPage.jsx";
// import InterviewReport from "./pages/InterviewReport.jsx";
// import Roadmap from "./pages/Roadmap.jsx";
// import Billing from "./pages/Billing.jsx";

// import { getCurrentUser } from "../apis/user.api";
// import { getResume } from "../apis/resume.api.js";

// import { setResume } from "./redux/resumeSlice.js";

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const dispatch = useDispatch();

//   // Check authentication
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const data = await getCurrentUser();
//         setUser(data?.user || null);
//       } catch (error) {
//         console.error("Authentication Error:", error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUser();
//   }, []);

//   // Fetch resume only when user is authenticated
//   useEffect(() => {
//     if (!user) {
//       dispatch(setResume(null));
//       return;
//     }

//     const getResumeData = async () => {
//       try {
//         const response = await getResume();
//         dispatch(setResume(response?.data || null));
//       } catch (error) {
//         if (error.response?.status !== 401) {
//           console.error("Resume Error:", error);
//         }
//       }
//     };

//     getResumeData();
//   }, [user, dispatch]);

//   if (loading) {
//     return (
//       <div className="fixed top-0 left-0 w-full z-[9999]">
//         <div className="h-1 bg-black animate-pulse w-full" />
//       </div>
//     );
//   }

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           user ? (
//             <Navigate to="/dashboard" replace />
//           ) : (
//             <Home setUser={setUser} />
//           )
//         }
//       />

//       <Route
//         path="/dashboard"
//         element={
//           user ? (
//             <Dashboard user={user} setUser={setUser} />
//           ) : (
//             <Navigate to="/" replace />
//           )
//         }
//       />

//       <Route
//         path="/scorer"
//         element={
//           user ? <Scorer user={user} setUser={setUser} /> : <Navigate to="/" replace />
//         }
//       />

//       <Route
//         path="/resume"
//         element={
//           user ? <ResumeBulider user={user} setUser={setUser} /> : <Navigate to="/" replace />
//         }
//       />

//       <Route
//         path="/interview"
//         element={
//           user ? <InterviewStart user={user} setUser={setUser} /> : <Navigate to="/" replace />
//         }
//       />

//       <Route
//         path="/interview/:id"
//         element={
//           user ? <InterviewPage user={user} setUser={setUser} /> : <Navigate to="/" replace />
//         }
//       />

//       <Route
//         path="/interview/:id/report"
//         element={
//           user ? <InterviewReport user={user} setUser={setUser} /> : <Navigate to="/" replace />
//         }
//       />

//       <Route
//         path="/roadmap"
//         element={
//           user ? <Roadmap user={user} setUser={setUser} /> : <Navigate to="/" replace />
//         }
//       />

//       <Route
//         path="/billing"
//         element={
//           user ? <Billing user={user} setUser={setUser} /> : <Navigate to="/" replace />
//         }
//       />

//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default App;

