/* eslint-disable no-await-in-loop */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from "react";
import moment from "moment";
import { database } from "src/services/firebase";
import { shuffle, weightedValue } from "src/utilities/helper";
import { getAuthId } from "src/services/localStorage.service";
import UserLayout from "../user-layout";
import { NewDashboard } from "../newDashboard";

const Slider = () => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    database
      .ref("/master/sub_sliders")
      .once("value")
      .then(async (snapshot) => {
        let subSliders = snapshot.val();
        const slidersData = [];
        let flag = true;
        if (subSliders !== null && subSliders) {
          for (let i = 0; i < 5; i += 1) {
            const shuffleSubSliders = shuffle(subSliders);
            if (flag) {
              const slider = await shuffleSubSliders.find(
                (ele) => ele.type === "Positive"
              );
              subSliders = await shuffleSubSliders.filter((ele) => {
                if (ele.slider !== slider.slider) return ele;
                return null;
              });
              slider.value = 0;
              slidersData.push(slider);
            } else if (!flag) {
              const slider = await shuffleSubSliders.find(
                (ele) => ele.type === "Negative"
              );
              subSliders = await shuffleSubSliders.filter((ele) => {
                if (ele.slider !== slider.slider) return ele;
                return null;
              });
              slider.value = 0;
              slidersData.push(slider);
            }
            flag = !flag;
          }
          setSliders(slidersData);
        }
      });
  }, []);

  const submit = async (slider) => {
    const userId = getAuthId();
    const date = moment().format("DD-MM-yyyy").toString();
    const weekOfYear = moment().format("w_yyyy");
    const brewData = {
      [date]: {
        date,
      },
    };
    let avg = 0;
    for (let i = 0; i < slider.length; i += 1) {
      const weightvalue = await weightedValue(slider[i].weight, 9);
      avg += weightvalue;
      const brewSlider = {
        value: slider[i].value,
        weightvalue,
        sub_slider: slider[i].name,
      };
      // @ts-ignore: Type 'string[]' cannot be used as an index type.
      brewData[[date]][[slider[i].slider]] = brewSlider;
    }
    // @ts-ignore: Type 'string[]' cannot be used as an index type.
    brewData[[date]].avarage = avg / slider.length;

    await database.ref(`users/${userId}/brew/`).set({
      brewData,
    });

    await database.ref(`users/${userId}/brew/weeks_average`).set({
      [weekOfYear]: {
        avg: 9,
        dominant_emotion: "Joyful",
      },
    });
  };

  // console.log('sliders', sliders);
  return (
    <UserLayout>
      {sliders && sliders.length > 0 && (
        <NewDashboard sliders={sliders} submit={submit} />
      )}
    </UserLayout>
  );
};

export default Slider;
