import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { testResults } from '../assets/testResults';
import { getSearchResults } from '../apiCalls';
import Search from '../components/Search/Search';
import App from '../components/App/App';
jest.mock('../apiCalls.tsx');

describe('Search', () => {

  const handleNewSearch = jest.fn();
  const resetSearch = jest.fn();
  const handleError = jest.fn();

  it('Renders the Search elements', () => {

    render(
      <MemoryRouter>
        <Search
          handleNewSearch={handleNewSearch}
          resetSearch={resetSearch}
          handleError={handleError}
        />
      </MemoryRouter>
    )

    const searchContainer = screen.getByTestId(`search-wrap`);
    expect(searchContainer).toBeInTheDocument();
  });

  it('Renders the keyword input', () => {

    render(
      <MemoryRouter>
        <Search
          handleNewSearch={handleNewSearch}
          resetSearch={resetSearch}
          handleError={handleError}
        />
      </MemoryRouter>
    )

    const keywordInput = screen.getByPlaceholderText("Search Repositories By Keyword");
    expect(keywordInput).toBeInTheDocument();
  });
  it('Renders the language filter input', () => {

    render(
      <MemoryRouter>
        <Search
          handleNewSearch={handleNewSearch}
          resetSearch={resetSearch}
          handleError={handleError}
        />
      </MemoryRouter>
    )

    const languageInput = screen.getByPlaceholderText("optional");
    const languageLabel = screen.getByText("Language :");
    expect(languageInput).toBeInTheDocument();
    expect(languageLabel).toBeInTheDocument();
  });
  it('Renders the sort by input', () => {

    render(
      <MemoryRouter>
        <Search
          handleNewSearch={handleNewSearch}
          resetSearch={resetSearch}
          handleError={handleError}
        />
      </MemoryRouter>
    )

    const sortByInput = screen.getByText("Best Match");
    const sortByLabel = screen.getByText("Sort By :");
    expect(sortByInput).toBeInTheDocument();
    expect(sortByLabel).toBeInTheDocument();
  });
  it('Renders the search button', () => {

    render(
      <MemoryRouter>
        <Search
          handleNewSearch={handleNewSearch}
          resetSearch={resetSearch}
          handleError={handleError}
        />
      </MemoryRouter>
    )

    const searchButton = screen.getByText("SEARCH");
    expect(searchButton).toBeInTheDocument();
  });
  // it('Should allow a user to search by keyword', async () => {
  //
  //   getSearchResults.mockResolvedValue(testResults);
  //   await act(getSearchResults)
  //
  //   render(
  //     <MemoryRouter>
  //       <App />
  //     </MemoryRouter>
  //   )
  //   const keywordInput = screen.getByPlaceholderText("Search Repositories By Keyword");
  //   const languageInput = screen.getByPlaceholderText("optional");
  //   const sortByInput = screen.getByText("Best Match");
  //   const searchButton = screen.getByText("SEARCH");
  //   userEvent.type(keywordInput, 'Hello, World!')
  //   act(()=> userEvent.click(searchButton))
  //   // expect(handleNewSearch).toHaveBeenCalled();
  //   const result1 = await waitFor(() => screen.getByText(testResults[0].name))
  //   expect(result1).toBeInTheDocument();
  // });
});
