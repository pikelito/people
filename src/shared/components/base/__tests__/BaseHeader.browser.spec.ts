import { render } from '@testing-library/vue';
import BaseHeader from '../BaseHeader.vue';

describe('BaseHeader', () => {
  it('should render the title', () => {
    const title = 'Listado de personas';
    const { getByText } = render(BaseHeader, {
      props: {
        title,
      },
    });

    expect(getByText(title)).toBeInTheDocument();
  });
});
