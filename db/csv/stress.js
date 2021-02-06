import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://localhost:3001/api/reviews/9500000');
  sleep(1);
}
