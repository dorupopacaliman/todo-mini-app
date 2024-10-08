import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse } from 'msw';
import { beforeEach, describe, expect, it } from 'vitest';
import { addMockApiRouteHandler } from '../test/mockServer';
import { renderRoute } from '../test/renderRoute';

beforeEach(() => {});

describe('PostList component', () => {
  it('properly filters the post list based on filter inputs', async () => {
    const user = userEvent.setup();

    addMockApiRouteHandler('get', '/posts', ({ request }) => {
      const posts = [
        {
          id: 1,
          title: 'first post',
          body: 'first post body',
          userId: 1,
        },
        {
          id: 2,
          title: 'second post',
          body: 'second post body',
          userId: 2,
        },
      ];
      return HttpResponse.json(
        posts.filter(post => {
          const searchParams = new URL(request.url).searchParams;
          const title = searchParams.get('q') || '';
          const userId = parseInt(searchParams.get('userId') || '');
          return post.title.includes(title) && (isNaN(userId) || post.userId === userId);
        })
      );
    });

    addMockApiRouteHandler('get', '/users', () => {
      return HttpResponse.json([
        {
          id: 1,
          name: 'first user',
        },
        {
          id: 2,
          name: 'second user',
        },
      ]);
    });

    renderRoute('/posts');

    expect(await screen.findByText('first post')).toBeInTheDocument();
    expect(screen.getByText('second post')).toBeInTheDocument();

    const queryInput = screen.getByLabelText('Query');
    const filterBtn = screen.getByText('Filter');
    await user.type(queryInput, 'first');
    await user.click(filterBtn);

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    expect(screen.getByText('first post')).toBeInTheDocument();
    expect(screen.queryByText('second post')).not.toBeInTheDocument();
    expect(queryInput).toHaveValue('first');
    
    const userInput = screen.getByLabelText('Author');
    await user.selectOptions(userInput, 'second user');
    await user.clear(queryInput);
    await user.click(filterBtn);
    
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    expect(screen.queryByText('first post')).not.toBeInTheDocument();
    expect(screen.getByText('second post')).toBeInTheDocument();
    expect(userInput).toHaveValue('2');
  });
});
