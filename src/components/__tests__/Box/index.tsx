import { render } from '@testing-library/react';

import { Box } from 'src/components';

describe('box', () => {
  it('renders the component', () => {
    const { container } = render(<Box />);
    expect(container).toBeInTheDocument();
  });
});
