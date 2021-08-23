/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import moment from 'moment';
import { firebaseInit } from 'src/services/firebase';
import { getAuthId, getDbUrl } from 'src/services/localStorage.service';
// import { pieLogic } from '../../utils/helper';
// const graphData = APIData.slice(2, 8).concat([APIData[1]])

const leftPadding = 10;
const lineWidth = 8;
const xtraWidth = 5;
const gapBtwColors = 0.6;
const totalWidth = lineWidth + xtraWidth;

export default class V2 extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      focusedID: null,
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleJournalText = this.handleJournalText.bind(this);
    this.handleJournalQuestion = this.handleJournalQuestion.bind(this);

  }


  componentDidMount() {
    let { graphData } = this.props;
    graphData = graphData.slice(1, 8);
    graphData.map((e, i) => {
      if (moment(e[8], 'DD-MM-yyyy').format('DD-MM-yyyy') === moment().format('DD-MM-yyyy')) {
        this.setState({ focusedID: i });
        this.handleJournalText(moment().format('DD-MM-yyyy'));
        this.handleJournalQuestion(moment().format('DD-MM-yyyy'));
      } else {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.setJournalText('');
        this.props.setJournalQuestion('');
      }
    });
  }

  handleFocus = (id, date) => {
    this.setState({ focusedID: id });
    this.handleJournalText(date);
    this.handleJournalQuestion(date);
  }

  handleJournalText = async (date) => {
    const dbRef = firebaseInit.database(getDbUrl());
    const userId = getAuthId();
    let journalTextData = await dbRef.ref(`users/${userId}/brew/brewData/${date}/journalText`).once('value');
    journalTextData = await journalTextData.val();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setJournalText(journalTextData);
  }

  handleJournalQuestion = async (date) => {
    const dbRef = firebaseInit.database(getDbUrl());
    const userId = getAuthId();
    let journalQuestionData = await dbRef.ref(`users/${userId}/brew/brewData/${date}/journalQuestion`).once('value');
    journalQuestionData = await journalQuestionData.val();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setJournalQuestion(journalQuestionData);
  }

  render() {
    const { focusedID } = this.state;
    let { graphData } = this.props;
    graphData = graphData.slice(1, 8); // .concat([graphData[1]]);
    // const linegraphValues = [...graphData]; // linegraphValues.pop(); // excluding sunday
    // const polyLinePoints = linegraphValues.map((e, i) => {
    //   if (moment(e[8], 'DD-MM-yyyy').format() <= moment().format()) {
    //     const sx = (i + 1) * (leftPadding + lineWidth);
    //     const sy = 120 - (e[7] * 10);
    //     return ` ${sx},${sy} `;
    //   }
    // }).join(' ');
    return (
      <div style={{ width: '100%', height: '330px' }}>
        <svg height="100%" width="100%" viewBox="0 0 140 144" xmlns="http://www.w3.org/2000/svg">
          {graphData.map((e, i) => {
            const [day, value] = e;
            const values = e.slice(2, 7);
            // values = values.map(v => pieLogic[v]);
            const date = e[8];
            return (
              <Fragment key={i}>
                <RenderBarchart
                  day={day}
                  sx={(i + 1) * (leftPadding + lineWidth)}
                  sy={10}
                  // value={parseFloat(value).toFixed(1)}
                  value={parseFloat(e[7]).toFixed(1)}
                  id={i}
                  values={values}
                  date={date}
                  focusedID={focusedID}
                  handleFocus={this.handleFocus}
                />
              </Fragment>
            );
          })}
          {/* <polyline points={polyLinePoints} strokeLinejoin="round" strokeDasharray="2,2" strokeWidth="0.4" fillOpacity="0.25" stroke="#1E00A366" fill="none" /> */}
        </svg>
      </div>
    );
  }
}

export const RenderBarchart = (props) => {
  const {
    id, handleFocus, sx = 10, sy = 10, defaultColor = '#0045FF', focusedID, day = 'DAY', value = 5, date = '',
  } = props;
  let { values = [] } = props;
  const irritable = values[1];
  values.splice(1, 1); // removing irritable
  values = [irritable, ...values]; // adding irritable to front

  const graphValue = value * 10;
  const [intValue, decimalValue = 0] = value.toString().split('.');

  const origin = sy + 110;

  const valuesSum = values.reduce((a, b) => a + b, 0);
  // 2: "Anxious"
  // 3: "Irritable"
  // 4: "Joyful"
  // 5: "Motivated"
  // 6: "Social"
  // const emotions = ['Irritable', 'Anxious', 'Joyful', 'Motivated', 'Social']
  const emotionColor = ['#FF2267', '#BA81FF', '#00c1fc', '#61d02f', '#E619D4'];
  const emotionValues = values.map(e => e / valuesSum * graphValue);
  const month = moment(date, 'DD-MM-yyyy').format('MMM');
  const [dd] = date.split('-');
  // const month = mm && mm.replace('0', '');

  let offset = origin;
  return (
    <>
      <g onClick={() => graphValue > 0 && handleFocus(id, date)}>
        {/* excluding sunday */}
        {moment(date, 'DD-MM-yyyy').format() <= moment().format() && (
          <>
            {id === focusedID && graphValue > 0
              ? (
                <>
                  <text x={sx} y={sy - 3} fill="#393939aa" textAnchor="middle" fontSize="10px" fontFamily="Mont-HeavyDEMO">
                    {intValue}
                    .
                    <tspan fontSize="6px">{decimalValue.charAt(0)}</tspan>
                  </text>
                  {emotionValues.map((emotionValue, i) => {
                    const colorSx = sx - (totalWidth / 2);
                    const colorHeight = i === 0 ? 0 : gapBtwColors;
                    const comp = (
                      <>
                        {i === 0 && (
                          <defs key={i}>
                            <clipPath id="multiColorBar0">
                              <rect x={colorSx} y={offset - emotionValue - 8} rx="8" ry="8" width={totalWidth} height={emotionValue - colorHeight + 8} />
                            </clipPath>
                          </defs>
                        )}
                        <rect x={colorSx} y={offset - emotionValue} width={totalWidth} height={emotionValue - (colorHeight)} fill={emotionColor[i]} clipPath={i === 0 ? `url(#multiColorBar${i})` : ''} />
                      </>
                    );
                    offset -= emotionValue;
                    return comp;
                  })}
                </>
              )
              : (
                <>
                  <defs key={id}>
                    <clipPath id={`defaultColorBar${id}`}>
                      <rect
                        x={sx - (lineWidth / 2)}
                        y={sy + 5 + (100 - graphValue)}
                        width={lineWidth}
                        height={graphValue + 5}
                        rx={5}
                        ry={5}
                      />
                      {graphValue > 95 && (
                        <rect
                          x={sx - (lineWidth / 2)}
                          y={sy + 5 + (100 - graphValue)}
                          width={lineWidth}
                          height={graphValue}
                          rx={5}
                          ry={5}
                        />
                      )}
                    </clipPath>
                  </defs>

                  <rect x={sx - (lineWidth / 2)} y={sy + 10} rx={5} ry={5} width={lineWidth} height={100} fill="#D0CAEB" />

                  <rect
                    x={sx - (lineWidth / 2)}
                    y={sy + 10 + (100 - graphValue)}
                    rx={graphValue > 95 ? 5 : 0}
                    ry={graphValue > 95 ? 5 : 0}
                    width={lineWidth}
                    height={graphValue}
                    fill={defaultColor}
                    clipPath={graphValue > 95 ? '' : `url(#defaultColorBar${id})`}
                  />
                </>
              )}
          </>
        )}
        <text x={sx} y={sy + 123} fill="#393939aa" dominantBaseline="middle" textAnchor="middle" fontSize="4px">{day.toUpperCase()}</text>
        <text x={sx} y={sy + 130} fill="#393939aa" dominantBaseline="middle" textAnchor="middle" fontSize="4.3px">{`${dd} ${month}`}</text>
      </g>
    </>
  );
};

