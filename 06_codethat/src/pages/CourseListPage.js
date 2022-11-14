import { useState } from "react";
import ListPage from "../components/ListPage";
import Warn from "../components/Warn";
import CourseItem from "../components/CourseItem";
import { getCourses } from "../api";
import styles from "./CourseListPage.module.css";
import searchBarStyles from "../components/SearchBar.module.css";
import searchIcon from "../assets/search.svg";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function CourseListPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initKeyword = searchParams.get("keyword");

    const [keyword, setKeyword] = useState(initKeyword || "");
    const courses = getCourses(initKeyword);

    const handleKeywordChange = (e) => setKeyword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchParams(
            keyword
                ? {
                      keyword,
                  }
                : {}
        );
    };

    return (
        <>
            <Helmet>
                <title>Codethat - 카탈로그</title>
            </Helmet>
            <ListPage
                variant="catalog"
                title="모든 코스"
                description="자체 제작된 코스들로 기초를 쌓으세요."
            >
                <form className={searchBarStyles.form} onSubmit={handleSubmit}>
                    <input
                        name="keyword"
                        value={keyword}
                        onChange={handleKeywordChange}
                        placeholder="검색으로 코스 찾기"
                    ></input>
                    <button type="submit">
                        <img src={searchIcon} alt="검색" />
                    </button>
                </form>

                <p className={styles.count}>총 {courses.length}개 코스</p>

                {initKeyword && courses.length === 0 ? (
                    <Warn
                        className={styles.emptyList}
                        title="조건에 맞는 코스가 없어요."
                        description="올바른 검색어가 맞는지 다시 한 번 확인해 주세요."
                    />
                ) : (
                    <div className={styles.courseList}>
                        {courses.map((course) => (
                            <CourseItem key={course.id} course={course} />
                        ))}
                    </div>
                )}
            </ListPage>
        </>
    );
}

export default CourseListPage;
