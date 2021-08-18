import request from '../common';
import loginMock from './mock/login.mock.json';

export const fetchLogin = () => {
  return request({
    url: '/login',
    method: 'get',
    mock: loginMock,
    //   mock: [
    //     200,
    //     [
    //       { lzId: 1, ldcId: 1, state: "NJ", ldcName: "PSEG", lz: "PSEG" },
    //       { lzId: 2, ldcId: 2, state: "NJ", ldcName: "AECO", lz: "AECO" },
    //       { lzId: 3, ldcId: 3, state: "NY", ldcName: "ConEd", lz: "I" },
    //       { lzId: 4, ldcId: 3, state: "NY", ldcName: "ConEd", lz: "J" },
    //       { lzId: 5, ldcId: 3, state: "NY", ldcName: "ConEd", lz: "H" },
    //     ],
    //   ],
    // mock: {
    //   type: "networkError",
    // },
    // mock: {
    //   type: "timeout",
    // },
  });
};
