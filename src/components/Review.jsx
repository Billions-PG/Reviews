/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Collapse from 'react-bootstrap/Collapse';

import Stars from './Stars';

import style from './review.module.css';

const moment = require('moment');

const Review = ({ review, report }) => {
  const [expanded, toggleExpand] = useState(false);

  const purchased = <small>Purchased item</small>;

  return (
    <div data-testid="review" className={style.review}>
      <Col>
        <Row>
          <Col>
            <Row>
              <Col style={{ maxWidth: 'fit-content' }}>
                <Image className={style.icon} src={review.author.photo} roundedCircle />
              </Col>

              <Col>
                <h5>
                  <p>
                    <small>
                      {review.author.name}
                      <span className={style.spacer} />
                      {moment(Number(review.createdAt)).format('MMM D, YYYY')}
                    </small>
                  </p>
                </h5>
                <Row>
                  <Stars rating={review.rating} />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            {review.body.length < 250 ? review.body
              : (
                <div>
                  {`${review.body.substring(0, 250)}`}
                  {!expanded && (
                    <Badge
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleExpand(true)}
                      pill
                      variant="light"
                    >
                      <b>...</b>
                    </Badge>
                  )}
                  <Collapse in={expanded}>
                    <span>
                      {review.body.substring(250)}
                    </span>

                  </Collapse>
                </div>
              )}
            <br />
            {(review.purchased || review.photo) && purchased}
          </Col>
          <Col md="auto">

            <Row>{review.photo ? <Image src={review.photo} rounded /> : <></>}</Row>

          </Col>
        </Row>
        <Row className={style.report}>
          <small data-testid="report" className={style.report} onClick={() => report(review._id)}>report</small>
        </Row>
      </Col>
    </div>
  );
};

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
    createdAt: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  report: PropTypes.func.isRequired,
};

export default Review;
