const BASE_URL = "https://learn.codeit.kr/3608";

export async function getFoods({ order, cursor, limit, search }) {
    // https://learn.codeit.kr/api/foods 에서 api 대신 전화번호 뒷자리 사용을 권장
    const orderQuery = `?order=${order}`;
    const cursorQuery = cursor === null ? "" : `&cursor=${cursor}`;
    const limitQuery = `&limit=${limit}`;
    const searchQuery = search === undefined ? "" : `&search=${search}`;
    const response = await fetch(
        BASE_URL +
            "/foods" +
            orderQuery +
            cursorQuery +
            limitQuery +
            searchQuery
    );
    if (!response.ok) {
        throw new Error("조회 실패!");
    }

    const body = await response.json();
    return body;
}

export async function createFood(formData) {
    const response = await fetch(`${BASE_URL}/foods`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error("데이터를 생성하는데 실패했습니다");
    }
    const body = await response.json();
    return body;
}
