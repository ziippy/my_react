import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import CourseListPage from "./pages/CourseListPage";
import CoursePage from "./pages/CoursePage";
import WishListPage from "./pages/WishlistPage";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";

function Main() {
    return (
        <BrowserRouter>
            <App>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="courses" element={<CourseListPage />} />
                    <Route
                        path="courses/react-frontend-develpment"
                        element={<CoursePage />}
                    />
                    <Route path="questions" element={<QuestionListPage />} />
                    <Route path="questions/616825" element={<QuestionPage />} />
                    <Route path="wishlist" element={<WishListPage />} />
                </Routes>
            </App>
        </BrowserRouter>
    );
}

// function Main() {
//     return (
//         <BrowserRouter>
//             <App>
//                 <HomePage />
//             </App>
//         </BrowserRouter>
//     );
// }

export default Main;
