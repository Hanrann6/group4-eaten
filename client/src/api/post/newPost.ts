// TODO: 최신 게시물을 서버에서 받아옴. 페이징 시 16개 로딩 /posts
import { API } from '../api.const';
import { PostType } from '../../components/post';

interface PostsResponse {
  totalPosts: number;
  totalPages: number;
  pagenum: number;
  numberOfPostsInThisPage: number;
  posts: PostType[];
}

export async function fetchNewPosts(): Promise<PostType[]> {
  try {
    const response = await fetch(`${API}/posts`, {
      method: 'GET',
      credentials: 'include',
    });
    const data: PostsResponse = await response.json();

    if (response.ok && data.totalPosts > 0) {
      return data.posts;
    } else {
      throw new Error('Failed to fetch initial posts');
    }
  } catch (error) {
    console.error('Error fetching initial posts:', error);
    return [];
  }
}

// export async function fetchNextPage(page: number): Promise<PostType[]> {
//   try {
//     const response = await fetch(`${API}/posts?page=${page}`);
//     const data: PostsResponse = await response.json();

//     if (response.ok && data.totalPosts > 0) {
//       return data.posts;
//     } else {
//       throw new Error('Failed to fetch next page');
//     }
//   } catch (error) {
//     console.error('Error fetching next page:', error);
//     return [];
//   }
// }
