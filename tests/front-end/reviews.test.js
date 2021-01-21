/* eslint-disable react/jsx-filename-extension */
/**
 * @test-environment jsdom
 */
import 'jsdom-global/register';
import '@testing-library/jest-dom';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Reviews from '../../src/components/Reviews';
import Review from '../../src/components/Review';
import Stars from '../../src/components/Stars';
import NewReview from '../../src/components/NewReview';

const axios = require('axios');

jest.mock('axios');
axios.post.mockResolvedValue('posted');

const Controller = require('../../controllers');

describe('<Review />', () => {
  let mockReview;
  beforeAll(() => {
    mockReview = {
      author: {
        name: 'Jon',
      },
      rating: 5,
      purchased: false,
      body: 'Great product!',
      photo: 'sampleWebpage.com/100.jpg',
      _id: '1',
    };
  });

  test('creates a review from the author name, rating, purchased, and body', () => {
    const { queryByRole } = render(<Review report={jest.fn()} review={mockReview} />);
    expect(queryByRole('heading')).toBeTruthy();
  });
  test('clicking "report" calls a delete with the reviews _id', async () => {
    const mockReport = jest.fn();
    const { getByTestId } = render(<Review report={mockReport} review={mockReview} />);
    const report = getByTestId('report');
    userEvent.click(report);
    await waitFor(() => expect(mockReport).toHaveBeenCalledWith('1'));
  });
});

describe('<Reviews />', () => {
  let controllerSpy;
  let mockReview;
  beforeEach(() => {
    controllerSpy = jest.spyOn(Controller, 'getReview');
    mockReview = {
      author: {
        name: 'Jon',
      },
      rating: 5,
      purchased: false,
      body: 'Great product!',
      photo: 'sampleWebpage.com/100.jpg',
    };
    controllerSpy.mockResolvedValue([
      {
        ...mockReview, _id: '1', prodId: '1', rating: 5,
      },
      {
        ...mockReview, _id: '2', prodId: '1', rating: 0,
      }]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('calls Contoller.getReview on initialization', async () => {
    render(<Reviews prodId="1" />);
    await waitFor(() => expect(controllerSpy).toHaveBeenCalled());
  });
  test('renders a review for each product returned by Controller.getReview', async () => {
    const { findByTestId } = render(<Reviews prodId="1" />);
    const reviews = await findByTestId('review-count');
    expect(reviews).toHaveTextContent('2 reviews');
  });
  test('renders stars proportional to the average rating', async () => {
    const { findByTestId } = render(<Reviews prodId="1" />);
    const stars = await findByTestId('rating-stars');
    expect(stars).toHaveStyle({ width: '122px' });
  });
  test('clicking "report" triggers a re-render and removes the post', async () => {
    const { findAllByTestId } = render(<Reviews prodId="1" />);
    jest.mock('axios');
    axios.delete.mockResolvedValue('deleted');
    controllerSpy.mockResolvedValue([{
      ...mockReview, _id: '1', prodId: '1', rating: 5,
    }]);

    const report = await findAllByTestId('report');
    userEvent.click(report[0]);
    await waitFor(async () => expect(await findAllByTestId('review')).toHaveLength(1));
  });
});

describe('<Stars />', () => {
  test('filled in stars are proportional in width to the rating', () => {
    const { getByTestId } = render(<Stars rating={4} />);
    const star = getByTestId('rating-star');
    expect(star).toHaveStyle({ width: '59.2px' });
  });
  test('uses CSS modules', () => {
    const { getByTestId } = render(<Stars rating={4} />);
    const star = getByTestId('rating-star');
    expect(star).not.toHaveClass('star');
    expect(star).not.toHaveClass('individual');
  });
});

describe('<NewReview />', () => {
  let changeMock;
  let prodId;
  let component;
  beforeAll(() => {
    changeMock = jest.fn();
    prodId = '50';
  });
  beforeEach(() => {
    component = render(<NewReview change={changeMock} prodId={prodId} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('it has a form with a required name and body section', () => {
    const { getByTestId } = component;
    const form = getByTestId('new');
    const nameInput = getByTestId('name');
    const bodyInput = getByTestId('body');
    expect(form).toBeInTheDocument();
    expect(bodyInput).toBeRequired();
    expect(nameInput).toBeRequired();
  });
  test('does not submit if form is not valid', async () => {
    const { getByTestId } = component;
    const form = getByTestId('new');
    const submitBtn = getByTestId('submit');
    expect(form).not.toBeValid();
    userEvent.click(submitBtn);
    await waitFor(() => expect(axios.post).not.toHaveBeenCalled());
  });
  test('submits form if validation is complete', async () => {
    const { getByTestId } = component;
    const form = getByTestId('new');
    const nameInput = getByTestId('name');
    const bodyInput = getByTestId('body');
    const submitBtn = getByTestId('submit');
    userEvent.type(nameInput, 'a name');
    userEvent.type(bodyInput, 'some input here');
    expect(nameInput).toHaveValue('a name');
    expect(bodyInput).toHaveValue('some input here');
    expect(form).toBeValid();
    userEvent.click(submitBtn);
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });
  test('moving the mouse over the stars changes the width', () => {
    const { asFragment, getByTestId } = component;
    const starHolder = getByTestId('mouse-stars');
    userEvent.hover(starHolder);
    expect(asFragment()).toMatchSnapshot();
  });
  test('toggle the form resets the state values if not submitted', () => {
    const { asFragment, getByTestId } = component;
    const nameInput = getByTestId('name');
    const bodyInput = getByTestId('body');
    userEvent.type(nameInput, 'a name');
    userEvent.type(bodyInput, 'some input here');
    const toggle = getByTestId('toggle-form');
    userEvent.dblClick(toggle);
    expect(asFragment()).toMatchSnapshot();
  });
});
