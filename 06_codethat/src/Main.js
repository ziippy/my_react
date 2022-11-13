import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import CourseListPage from "./pages/CourseListPage";
import CoursePage from "./pages/CoursePage";
import WishListPage from "./pages/WishlistPage";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";
import NotFoundPage from "./pages/NotFoundPage";

function Main() {
    return (
        <BrowserRouter>
            <App>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="courses">
                        <Route index element={<CourseListPage />} />
                        <Route path=":courseSlug" element={<CoursePage />} />
                    </Route>
                    <Route path="questions">
                        <Route index element={<QuestionListPage />} />
                        <Route path=":questionId" element={<QuestionPage />} />
                    </Route>
                    <Route path="wishlist" element={<WishListPage />} />
                    {/* 모든 경로를 포함하는 페이지 */}
                    <Route path="*" element={<NotFoundPage />} />
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
