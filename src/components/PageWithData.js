import Page from './Page';
import withData from '../hoc/WithData';

const wrapper = (BaseComponent, styles = {}) => {
  return withData(Page(BaseComponent, styles));
};

export default wrapper;
