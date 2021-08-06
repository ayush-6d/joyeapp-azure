import styled from 'styled-components';
import { SliderTrackHighlight } from '@reach/slider';

const Tracker = styled(SliderTrackHighlight)`
  background: linear-gradient(to left, ${props => props.color}, ${props => props.sColor}) !important;
  border-radius: 10px !important;
`;

export default Tracker;
