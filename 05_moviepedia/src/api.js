const BASE_URL = "https://learn.codeit.kr/3608";

export async function getReviews({
    order = "createdAt",
    offset = 0,
    limit = 6,
}) {
    // throw new Error("버그가 아니라 기능입니다.");

    // https://learn.codeit.kr/api/film-reviews 에서 api 대신 전화번호 뒷자리 사용을 권장
    const query = `order=${order}&offset=${offset}&limit=${limit}`;
    const response = await fetch(`${BASE_URL}/film-reviews?${query}`);
    if (!response.ok) {
        throw new Error("조회 실패!");
    }

    const body = await response.json();
    return body;
}

export async function createReview(formData) {
    const response = await fetch(`${BASE_URL}/film-reviews`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error("리뷰 생성 실패!");
    }

    const body = await response.json();
    return body;
}

export async function updateReview(id, formData) {
    const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
        method: "PUT",
        body: formData,
    });
    if (!response.ok) {
        throw new Error("리뷰 수정 실패!");
    }

    const body = await response.json();
    console.log("body4:", body);
    return body;
}
