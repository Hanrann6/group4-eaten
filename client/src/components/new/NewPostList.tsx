import { useEffect, useState } from 'react';
import { fetchNewPosts, fetchNextPage } from '../../api/post/newPost'; // TODO: '../../api'로 불러올 수 있게 수정
import { Post, PostType } from '../post';
import { PostList } from './styles';

interface NewPostListProps {
  posts: PostType[]; // props 형식 수정
}

export const NewPostList = ({ posts: initialPosts }: NewPostListProps) => {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getNewPosts = async () => {
      try {
        const newPosts = await fetchNewPosts();
        setPosts(newPosts);
      } catch (error) {
        console.error('Error fetching new posts:', error);
      }
    };

    getNewPosts();
  }, []);

  useEffect(() => {
    // 최초 렌더링 시 초기 게시물을 가져옴
    fetchPosts(page);
  }, [page]);

  const fetchPosts = (pageNum: number) => {
    fetchNextPage(pageNum).then(nextPosts => {
      setPosts(prevPosts => [...prevPosts, ...nextPosts]);
      setPage(pageNum + 1);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 20) {
        // 스크롤이 맨 아래에 도달하면
        fetchPosts(page);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // 페이지 변경 시마다 이벤트 리스너를 업데이트

  return (
    <PostList>
      {posts.length === 0 ? (
        <div style={{ padding: '50px 0', marginBottom: '30' }}>게시글이 없습니다.</div>
      ) : (
        posts.map(post => <Post key={post.id} post={post} />)
      )}
    </PostList>
  );
};
