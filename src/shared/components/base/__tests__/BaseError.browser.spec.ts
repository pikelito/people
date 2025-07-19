import { render, fireEvent } from '@testing-library/vue';
import BaseError from '../BaseError.vue';

describe('BaseError', () => {
  const errorMessage = 'Ha ocurrido un error al obtener los datos';
  it('should render the error message', () => {
    const { getByText } = render(BaseError, {
      props: {
        message: errorMessage,
      },
    });

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('should emit a retry event when the button is clicked', async () => {
    const { getByTestId, emitted } = render(BaseError, {
      props: {
        message: errorMessage,
      },
    });

    await fireEvent.click(getByTestId('retry-button'));

    expect(emitted().retry).toBeTruthy();
  });
});
