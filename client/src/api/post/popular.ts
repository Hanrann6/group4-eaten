// TODO: 인시 게시물 9개를 서버에서 받아 옴 /hot-posts
import axios from 'axios';
import { PostType } from '../../components/post';
import { API } from '../api.const';
axios.defaults.withCredentials = true;

// 서버로부터 게시물 데이터를 받아오는 함수
export const fetchHotPosts = async (): Promise<PostType[]> => {
  try {
    const response = await axios.get(`${API}/hot-posts`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.msg);
    }
    return response.data.hots;
  } catch (error) {
    console.error('인기 게시물을 불러오는 데 실패했습니다:', error);
    return [];
  }
};
