import { useState } from "react";
import { getQuestions } from "../api";
import DateText from "../components/DateText";
import ListPage from "../components/ListPage";
import Warn from "../components/Warn";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import styles from "./QuestionListPage.module.css";
import searchBarStyles from "../components/SearchBar.module.css";
import searchIcon from "../assets/search.svg";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function QuestionItem({ question }) {
    return (
        <Card className={styles.questionItem} key={question.title}>
            <div className={styles.info}>
                <p className={styles.title}>
                    <Link to={`/questions/${question.id}`}>
                        {question.title}
                    </Link>
                    {question.answers.length > 0 && (
                        <span className={styles.count}>
                            [{question.answers.length}]
                        </span>
                    )}
                </p>
                <p className={styles.date}>
                    <DateText value={question.createdAt} />
                </p>
            </div>
            <div className={styles.writer}>
                <Avatar
                    photo={question.writer.profile.photo}
                    name={question.writer.name}
                />
            </div>
        </Card>
    );
}

function QuestionListPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initKeyword = searchParams.get("keyword");

    const [keyword, setKeyword] = useState(initKeyword || "");
    const questions = getQuestions(initKeyword);

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
                <title>Codethat - ????????????</title>
            </Helmet>
            <ListPage
                variant="community"
                title="????????????"
                description="???????????? 2??? ??????????????? ?????? ???????????????."
            >
                <form className={searchBarStyles.form} onSubmit={handleSubmit}>
                    <input
                        name="keyword"
                        value={keyword}
                        placeholder="???????????? ?????? ??????"
                        onChange={handleKeywordChange}
                    />
                    <button type="submit">
                        <img src={searchIcon} alt="??????" />
                    </button>
                </form>

                <p className={styles.count}>??? {questions.length}??? ??????</p>

                {initKeyword && questions.length === 0 ? (
                    <Warn
                        className={styles.emptyList}
                        title="????????? ?????? ????????? ?????????."
                        description="????????? ???????????? ????????? ?????? ??? ??? ????????? ?????????."
                    />
                ) : (
                    <div className={styles.questionList}>
                        {questions.map((question) => (
                            <QuestionItem
                                key={question.id}
                                question={question}
                            />
                        ))}
                    </div>
                )}
            </ListPage>
        </>
    );
}

export default QuestionListPage;
