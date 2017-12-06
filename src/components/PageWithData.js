import Page from './Page';
import withData from '../hoc/WithData';

const wrapper = (BaseComponent, styles = {}) => withData(Page(BaseComponent, styles));

export default wrapper;
