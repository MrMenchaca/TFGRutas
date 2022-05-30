import renderer from 'react-test-renderer';
import { ImportErrorModal } from '../src/front/pages/components/ImportErrorModal';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <ImportErrorModal/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});