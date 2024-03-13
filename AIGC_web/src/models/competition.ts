import { http } from "../utils/http";

// 赛事活动
export function competitionList(params: any) {
    return http({
        url: `/api/competitionList?per_page=${params.per_page}&page=${params.page}`,
        method: "get",
    });
}
// 赛事详情
export function getCompetitionDetail(params: any) {
    return http({
        url: `/api/competitionDetails?id=${params.id}`,
        method: "get",
    });
}

// 赛事详情
export function postCompList(params: any) {
    return http({
        url: `/api/compList`,
        method: "post",
        data: params
    });
}

