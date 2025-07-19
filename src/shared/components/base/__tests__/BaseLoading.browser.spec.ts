import { render } from '@testing-library/vue';
import BaseLoading from '../BaseLoading.vue';

describe('BaseLoading', () => {
  it('should render correctly', () => {
    const { container } = render(BaseLoading);
    expect(container).toBeInTheDocument();
  });
});
