import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';

const ExampleComponent = {
  template: '<div>Test example for {{ name }}</div>',
  props: {
    name: {
      type: String,
      default: 'people project',
    },
  },
};

describe('Example Component', () => {
  it('render component', async () => {
    render(ExampleComponent, {
      props: {
        name: 'people project',
      },
    });
    expect(
      screen.getByText('Test example for people project')
    ).toBeInTheDocument();
  });
});
