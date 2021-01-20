import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';

const Review = ({ review }) => (
  <div className="review">
    <Media>
      <Media.Body>
        <h5>{review.author.name}</h5>
        {review.rating}
        <br />
        <small>{review.purchased ? 'bought' : 'didn\'t buy'}</small>
        <p>
          {review.body}
        </p>
      </Media.Body>
      {review.photo ? <Image src={review.photo} rounded /> : <></>}
    </Media>
  </div>
);

Review.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.string,
    }),
    rating: PropTypes.number.isRequired,
    purchased: PropTypes.bool.isRequired,
    body: PropTypes.string.isRequired,
    photo: PropTypes.string,
  }).isRequired,
};

export default Review;
