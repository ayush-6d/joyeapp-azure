import * as React from 'react';

export interface ICircle {
  isPlaying: boolean;
  complete: any;
}
export interface ICircleState {
  counter: number;
  freeze: boolean;
}

export default class Circles extends React.PureComponent<ICircle, ICircleState> {

  constructor(props: ICircle) {
    super(props);
    this.state = { counter: 0, freeze: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying === this.props.isPlaying) return;
    if (nextProps.isPlaying) {
      this.setState({ freeze: true },()=>{
        this.setState({ freeze: false },()=>{
          (document.getElementById("circlesSvg") as any).setCurrentTime(0);
          (document.getElementById("circlesSvg") as any).unpauseAnimations();
          for (let i = 10; i < 22; i++)(document.getElementById(`a11${i}`) as any).beginElement();
          this.startCounter();
        });
      });
    } else {
      if ((window as any).timer) clearTimeout((window as any).timer);
      this.setState({ counter: 0 });
      (document.getElementById("circlesSvg") as any).pauseAnimations();
      (document.getElementById("circlesSvg") as any).setCurrentTime(0);
    }
  }

  startCounter() {
    const timings = [10500, 3000, 5000, 3000, 5000, 3000, 5000, 3000, 5000, 3250, 6500, 3250, 6500, 3250, 6500, 3500, 7500, 3500, 7500, 3500, 7500, 3500, 7500];
    let self = this;
    function recurse(i) {
      if (i === 20) setTimeout(() => self.props.complete(), 7000);
      if (!self.props.isPlaying) return;
      if (self.state.counter === 0) self.setState({ counter: 10 });
      else self.setState({ counter: self.state.counter - 1 });
      if (i < timings.length - 3) (window as any).timer = setTimeout(() => recurse(i + 2), timings[i + 1] + timings[i + 2]);
    }
    (window as any).timer = setTimeout(x => recurse(0), timings[0]);
  }

  render() {
    return (
      this.state.freeze ? null :
      <svg id="circlesSvg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12000 12000">
        <defs>
          <style type="text/css">@import url('https://fonts.googleapis.com/css?family=Lato|Open+Sans|Oswald|Raleway|Roboto|Indie+Flower|Gamja+Flower');</style>
        </defs>
        <circle id="circle10" r="3931" cx="6000" cy="6000" fill="#D188E7" />
        <circle id="circle11" r="3788" cx="6000" cy="6000" fill="#997DFF" />
        <circle id="circle12" r="3578" cx="6000" cy="6000" fill="#00B1FF" />
        <circle id="circle13" r="3302" cx="6000" cy="6000" fill="#0DD85B" />
        <circle id="circle14" r="3204" cx="6000" cy="6000" fill="#F9BC48" />
        <circle id="circle15" r="2964" cx="6000" cy="6000" fill="#FFCF08" />
        <circle id="circle16" r="2821" cx="6000" cy="6000" fill="#FF1372" />
        <circle id="circle17" r="2644" cx="6000" cy="6000" fill="#EFEFEF" />
        <circle id="circle18" r="2467" cx="6000" cy="6000" fill="#FFFFFF" />
        <circle id="circle19" r="2345" cx="6000" cy="6000" fill="#E8E4F5" />
        <circle id="circle20" r="2208" cx="6000" cy="6000" fill="#C0B7E5" />
        <circle id="circle21" r="1862" cx="6000" cy="6000" fill="#1F00A2" />

        <animate id="a1110" begin="infinite" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="3931;3931" dur="10.5s" />
        <animate id="a1111" begin="infinite" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="3788;3788" dur="10.5s" />
        <animate id="a1112" begin="infinite" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="3578;3578" dur="10.5s" />
        <animate id="a1113" begin="infinite" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="3302;3302" dur="10.5s" />
        <animate id="a1114" begin="infinite" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3204;3204" dur="10.5s" />
        <animate id="a1115" begin="infinite" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="2964;2964" dur="10.5s" />
        <animate id="a1116" begin="infinite" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="2821;2821" dur="10.5s" />
        <animate id="a1117" begin="infinite" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="2644;2644" dur="10.5s" />
        <animate id="a1118" begin="infinite" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="2467;2467" dur="10.5s" />
        <animate id="a1119" begin="infinite" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2345;2345" dur="10.5s" />
        <animate id="a1120" begin="infinite" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2208;2208" dur="10.5s" />
        <animate id="a1121" begin="infinite" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="10.5s" />
        <animate id="a1210" begin="a1110.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="3931;5589" dur="3s" />
        <animate id="a1211" begin="a1111.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="3788;5292" dur="3s" />
        <animate id="a1212" begin="a1112.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="3578;4810" dur="3s" />
        <animate id="a1213" begin="a1113.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="3302;4339" dur="3s" />
        <animate id="a1214" begin="a1114.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3204;3992" dur="3s" />
        <animate id="a1215" begin="a1115.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="2964;3767" dur="3s" />
        <animate id="a1216" begin="a1116.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="2821;3583" dur="3s" />
        <animate id="a1217" begin="a1117.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="2644;3440" dur="3s" />
        <animate id="a1218" begin="a1118.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="2467;3168" dur="3s" />
        <animate id="a1219" begin="a1119.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2345;2883" dur="3s" />
        <animate id="a1220" begin="a1120.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2208;2407" dur="3s" />
        <animate id="a1221" begin="a1121.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="3s" />
        <animate id="a1310" begin="a1210.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="5589;3931" dur="5s" />
        <animate id="a1311" begin="a1211.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="5292;3788" dur="5s" />
        <animate id="a1312" begin="a1212.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="4810;3578" dur="5s" />
        <animate id="a1313" begin="a1213.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="4339;3302" dur="5s" />
        <animate id="a1314" begin="a1214.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3992;3204" dur="5s" />
        <animate id="a1315" begin="a1215.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="3767;2964" dur="5s" />
        <animate id="a1316" begin="a1216.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="3583;2821" dur="5s" />
        <animate id="a1317" begin="a1217.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="3440;2644" dur="5s" />
        <animate id="a1318" begin="a1218.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="3168;2467" dur="5s" />
        <animate id="a1319" begin="a1219.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2883;2345" dur="5s" />
        <animate id="a1320" begin="a1220.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2407;2208" dur="5s" />
        <animate id="a1321" begin="a1221.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="5s" />
        <animate id="a1410" begin="a1310.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="3931;5589" dur="3s" />
        <animate id="a1411" begin="a1311.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="3788;5292" dur="3s" />
        <animate id="a1412" begin="a1312.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="3578;4810" dur="3s" />
        <animate id="a1413" begin="a1313.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="3302;4339" dur="3s" />
        <animate id="a1414" begin="a1314.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3204;3992" dur="3s" />
        <animate id="a1415" begin="a1315.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="2964;3767" dur="3s" />
        <animate id="a1416" begin="a1316.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="2821;3583" dur="3s" />
        <animate id="a1417" begin="a1317.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="2644;3440" dur="3s" />
        <animate id="a1418" begin="a1318.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="2467;3168" dur="3s" />
        <animate id="a1419" begin="a1319.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2345;2883" dur="3s" />
        <animate id="a1420" begin="a1320.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2208;2407" dur="3s" />
        <animate id="a1421" begin="a1321.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="3s" />
        <animate id="a1510" begin="a1410.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="5589;3931" dur="5s" />
        <animate id="a1511" begin="a1411.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="5292;3788" dur="5s" />
        <animate id="a1512" begin="a1412.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="4810;3578" dur="5s" />
        <animate id="a1513" begin="a1413.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="4339;3302" dur="5s" />
        <animate id="a1514" begin="a1414.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3992;3204" dur="5s" />
        <animate id="a1515" begin="a1415.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="3767;2964" dur="5s" />
        <animate id="a1516" begin="a1416.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="3583;2821" dur="5s" />
        <animate id="a1517" begin="a1417.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="3440;2644" dur="5s" />
        <animate id="a1518" begin="a1418.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="3168;2467" dur="5s" />
        <animate id="a1519" begin="a1419.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2883;2345" dur="5s" />
        <animate id="a1520" begin="a1420.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2407;2208" dur="5s" />
        <animate id="a1521" begin="a1421.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="5s" />
        <animate id="a1610" begin="a1510.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="3931;5589" dur="3s" />
        <animate id="a1611" begin="a1511.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="3788;5292" dur="3s" />
        <animate id="a1612" begin="a1512.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="3578;4810" dur="3s" />
        <animate id="a1613" begin="a1513.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="3302;4339" dur="3s" />
        <animate id="a1614" begin="a1514.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3204;3992" dur="3s" />
        <animate id="a1615" begin="a1515.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="2964;3767" dur="3s" />
        <animate id="a1616" begin="a1516.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="2821;3583" dur="3s" />
        <animate id="a1617" begin="a1517.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="2644;3440" dur="3s" />
        <animate id="a1618" begin="a1518.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="2467;3168" dur="3s" />
        <animate id="a1619" begin="a1519.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2345;2883" dur="3s" />
        <animate id="a1620" begin="a1520.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2208;2407" dur="3s" />
        <animate id="a1621" begin="a1521.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="3s" />
        <animate id="a1710" begin="a1610.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="5589;3931" dur="5s" />
        <animate id="a1711" begin="a1611.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="5292;3788" dur="5s" />
        <animate id="a1712" begin="a1612.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="4810;3578" dur="5s" />
        <animate id="a1713" begin="a1613.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="4339;3302" dur="5s" />
        <animate id="a1714" begin="a1614.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3992;3204" dur="5s" />
        <animate id="a1715" begin="a1615.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="3767;2964" dur="5s" />
        <animate id="a1716" begin="a1616.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="3583;2821" dur="5s" />
        <animate id="a1717" begin="a1617.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="3440;2644" dur="5s" />
        <animate id="a1718" begin="a1618.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="3168;2467" dur="5s" />
        <animate id="a1719" begin="a1619.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2883;2345" dur="5s" />
        <animate id="a1720" begin="a1620.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2407;2208" dur="5s" />
        <animate id="a1721" begin="a1621.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="5s" />
        <animate id="a1810" begin="a1710.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="3931;5589" dur="3s" />
        <animate id="a1811" begin="a1711.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="3788;5292" dur="3s" />
        <animate id="a1812" begin="a1712.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="3578;4810" dur="3s" />
        <animate id="a1813" begin="a1713.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="3302;4339" dur="3s" />
        <animate id="a1814" begin="a1714.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3204;3992" dur="3s" />
        <animate id="a1815" begin="a1715.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="2964;3767" dur="3s" />
        <animate id="a1816" begin="a1716.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="2821;3583" dur="3s" />
        <animate id="a1817" begin="a1717.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="2644;3440" dur="3s" />
        <animate id="a1818" begin="a1718.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="2467;3168" dur="3s" />
        <animate id="a1819" begin="a1719.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2345;2883" dur="3s" />
        <animate id="a1820" begin="a1720.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2208;2407" dur="3s" />
        <animate id="a1821" begin="a1721.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="3s" />
        <animate id="a1910" begin="a1810.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="5589;3931" dur="5s" />
        <animate id="a1911" begin="a1811.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="5292;3788" dur="5s" />
        <animate id="a1912" begin="a1812.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="4810;3578" dur="5s" />
        <animate id="a1913" begin="a1813.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="4339;3302" dur="5s" />
        <animate id="a1914" begin="a1814.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3992;3204" dur="5s" />
        <animate id="a1915" begin="a1815.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="3767;2964" dur="5s" />
        <animate id="a1916" begin="a1816.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="3583;2821" dur="5s" />
        <animate id="a1917" begin="a1817.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="3440;2644" dur="5s" />
        <animate id="a1918" begin="a1818.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="3168;2467" dur="5s" />
        <animate id="a1919" begin="a1819.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2883;2345" dur="5s" />
        <animate id="a1920" begin="a1820.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2407;2208" dur="5s" />
        <animate id="a1921" begin="a1821.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="5s" />
        <animate id="a2010" begin="a1910.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="3931;5589" dur="3.25s" />
        <animate id="a2011" begin="a1911.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="3788;5292" dur="3.25s" />
        <animate id="a2012" begin="a1912.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="3578;4810" dur="3.25s" />
        <animate id="a2013" begin="a1913.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="3302;4339" dur="3.25s" />
        <animate id="a2014" begin="a1914.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3204;3992" dur="3.25s" />
        <animate id="a2015" begin="a1915.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="2964;3767" dur="3.25s" />
        <animate id="a2016" begin="a1916.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="2821;3583" dur="3.25s" />
        <animate id="a2017" begin="a1917.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="2644;3440" dur="3.25s" />
        <animate id="a2018" begin="a1918.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="2467;3168" dur="3.25s" />
        <animate id="a2019" begin="a1919.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2345;2883" dur="3.25s" />
        <animate id="a2020" begin="a1920.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2208;2407" dur="3.25s" />
        <animate id="a2021" begin="a1921.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="3.25s" />
        <animate id="a2110" begin="a2010.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="5589;3931" dur="6.5s" />
        <animate id="a2111" begin="a2011.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="5292;3788" dur="6.5s" />
        <animate id="a2112" begin="a2012.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="4810;3578" dur="6.5s" />
        <animate id="a2113" begin="a2013.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="4339;3302" dur="6.5s" />
        <animate id="a2114" begin="a2014.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3992;3204" dur="6.5s" />
        <animate id="a2115" begin="a2015.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="3767;2964" dur="6.5s" />
        <animate id="a2116" begin="a2016.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="3583;2821" dur="6.5s" />
        <animate id="a2117" begin="a2017.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="3440;2644" dur="6.5s" />
        <animate id="a2118" begin="a2018.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="3168;2467" dur="6.5s" />
        <animate id="a2119" begin="a2019.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2883;2345" dur="6.5s" />
        <animate id="a2120" begin="a2020.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2407;2208" dur="6.5s" />
        <animate id="a2121" begin="a2021.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="6.5s" />
        <animate id="a2210" begin="a2110.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="3931;5589" dur="3.25s" />
        <animate id="a2211" begin="a2111.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="3788;5292" dur="3.25s" />
        <animate id="a2212" begin="a2112.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="3578;4810" dur="3.25s" />
        <animate id="a2213" begin="a2113.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="3302;4339" dur="3.25s" />
        <animate id="a2214" begin="a2114.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3204;3992" dur="3.25s" />
        <animate id="a2215" begin="a2115.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="2964;3767" dur="3.25s" />
        <animate id="a2216" begin="a2116.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="2821;3583" dur="3.25s" />
        <animate id="a2217" begin="a2117.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="2644;3440" dur="3.25s" />
        <animate id="a2218" begin="a2118.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="2467;3168" dur="3.25s" />
        <animate id="a2219" begin="a2119.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2345;2883" dur="3.25s" />
        <animate id="a2220" begin="a2120.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2208;2407" dur="3.25s" />
        <animate id="a2221" begin="a2121.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="3.25s" />
        <animate id="a2310" begin="a2210.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="5589;3931" dur="6.5s" />
        <animate id="a2311" begin="a2211.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="5292;3788" dur="6.5s" />
        <animate id="a2312" begin="a2212.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="4810;3578" dur="6.5s" />
        <animate id="a2313" begin="a2213.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="4339;3302" dur="6.5s" />
        <animate id="a2314" begin="a2214.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3992;3204" dur="6.5s" />
        <animate id="a2315" begin="a2215.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="3767;2964" dur="6.5s" />
        <animate id="a2316" begin="a2216.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="3583;2821" dur="6.5s" />
        <animate id="a2317" begin="a2217.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="3440;2644" dur="6.5s" />
        <animate id="a2318" begin="a2218.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="3168;2467" dur="6.5s" />
        <animate id="a2319" begin="a2219.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2883;2345" dur="6.5s" />
        <animate id="a2320" begin="a2220.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2407;2208" dur="6.5s" />
        <animate id="a2321" begin="a2221.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="6.5s" />
        <animate id="a2410" begin="a2310.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="3931;5589" dur="3.25s" />
        <animate id="a2411" begin="a2311.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="3788;5292" dur="3.25s" />
        <animate id="a2412" begin="a2312.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="3578;4810" dur="3.25s" />
        <animate id="a2413" begin="a2313.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="3302;4339" dur="3.25s" />
        <animate id="a2414" begin="a2314.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3204;3992" dur="3.25s" />
        <animate id="a2415" begin="a2315.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="2964;3767" dur="3.25s" />
        <animate id="a2416" begin="a2316.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="2821;3583" dur="3.25s" />
        <animate id="a2417" begin="a2317.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="2644;3440" dur="3.25s" />
        <animate id="a2418" begin="a2318.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="2467;3168" dur="3.25s" />
        <animate id="a2419" begin="a2319.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2345;2883" dur="3.25s" />
        <animate id="a2420" begin="a2320.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2208;2407" dur="3.25s" />
        <animate id="a2421" begin="a2321.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="3.25s" />
        <animate id="a2510" begin="a2410.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="5589;3931" dur="6.5s" />
        <animate id="a2511" begin="a2411.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="5292;3788" dur="6.5s" />
        <animate id="a2512" begin="a2412.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="4810;3578" dur="6.5s" />
        <animate id="a2513" begin="a2413.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="4339;3302" dur="6.5s" />
        <animate id="a2514" begin="a2414.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3992;3204" dur="6.5s" />
        <animate id="a2515" begin="a2415.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="3767;2964" dur="6.5s" />
        <animate id="a2516" begin="a2416.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="3583;2821" dur="6.5s" />
        <animate id="a2517" begin="a2417.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="3440;2644" dur="6.5s" />
        <animate id="a2518" begin="a2418.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="3168;2467" dur="6.5s" />
        <animate id="a2519" begin="a2419.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2883;2345" dur="6.5s" />
        <animate id="a2520" begin="a2420.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2407;2208" dur="6.5s" />
        <animate id="a2521" begin="a2421.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="6.5s" />
        <animate id="a2610" begin="a2510.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="3931;5589" dur="3.5s" />
        <animate id="a2611" begin="a2511.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="3788;5292" dur="3.5s" />
        <animate id="a2612" begin="a2512.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="3578;4810" dur="3.5s" />
        <animate id="a2613" begin="a2513.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="3302;4339" dur="3.5s" />
        <animate id="a2614" begin="a2514.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3204;3992" dur="3.5s" />
        <animate id="a2615" begin="a2515.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="2964;3767" dur="3.5s" />
        <animate id="a2616" begin="a2516.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="2821;3583" dur="3.5s" />
        <animate id="a2617" begin="a2517.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="2644;3440" dur="3.5s" />
        <animate id="a2618" begin="a2518.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="2467;3168" dur="3.5s" />
        <animate id="a2619" begin="a2519.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2345;2883" dur="3.5s" />
        <animate id="a2620" begin="a2520.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2208;2407" dur="3.5s" />
        <animate id="a2621" begin="a2521.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="3.5s" />
        <animate id="a2710" begin="a2610.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="5589;3931" dur="7.5s" />
        <animate id="a2711" begin="a2611.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="5292;3788" dur="7.5s" />
        <animate id="a2712" begin="a2612.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="4810;3578" dur="7.5s" />
        <animate id="a2713" begin="a2613.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="4339;3302" dur="7.5s" />
        <animate id="a2714" begin="a2614.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3992;3204" dur="7.5s" />
        <animate id="a2715" begin="a2615.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="3767;2964" dur="7.5s" />
        <animate id="a2716" begin="a2616.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="3583;2821" dur="7.5s" />
        <animate id="a2717" begin="a2617.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="3440;2644" dur="7.5s" />
        <animate id="a2718" begin="a2618.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="3168;2467" dur="7.5s" />
        <animate id="a2719" begin="a2619.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2883;2345" dur="7.5s" />
        <animate id="a2720" begin="a2620.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2407;2208" dur="7.5s" />
        <animate id="a2721" begin="a2621.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="7.5s" />
        <animate id="a2810" begin="a2710.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="3931;5589" dur="3.5s" />
        <animate id="a2811" begin="a2711.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="3788;5292" dur="3.5s" />
        <animate id="a2812" begin="a2712.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="3578;4810" dur="3.5s" />
        <animate id="a2813" begin="a2713.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="3302;4339" dur="3.5s" />
        <animate id="a2814" begin="a2714.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3204;3992" dur="3.5s" />
        <animate id="a2815" begin="a2715.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="2964;3767" dur="3.5s" />
        <animate id="a2816" begin="a2716.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="2821;3583" dur="3.5s" />
        <animate id="a2817" begin="a2717.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="2644;3440" dur="3.5s" />
        <animate id="a2818" begin="a2718.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="2467;3168" dur="3.5s" />
        <animate id="a2819" begin="a2719.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2345;2883" dur="3.5s" />
        <animate id="a2820" begin="a2720.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2208;2407" dur="3.5s" />
        <animate id="a2821" begin="a2721.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="3.5s" />
        <animate id="a2910" begin="a2810.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="5589;3931" dur="7.5s" />
        <animate id="a2911" begin="a2811.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="5292;3788" dur="7.5s" />
        <animate id="a2912" begin="a2812.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="4810;3578" dur="7.5s" />
        <animate id="a2913" begin="a2813.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="4339;3302" dur="7.5s" />
        <animate id="a2914" begin="a2814.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3992;3204" dur="7.5s" />
        <animate id="a2915" begin="a2815.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="3767;2964" dur="7.5s" />
        <animate id="a2916" begin="a2816.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="3583;2821" dur="7.5s" />
        <animate id="a2917" begin="a2817.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="3440;2644" dur="7.5s" />
        <animate id="a2918" begin="a2818.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="3168;2467" dur="7.5s" />
        <animate id="a2919" begin="a2819.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2883;2345" dur="7.5s" />
        <animate id="a2920" begin="a2820.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2407;2208" dur="7.5s" />
        <animate id="a2921" begin="a2821.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="7.5s" />
        <animate id="a3010" begin="a2910.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="3931;5589" dur="3.5s" />
        <animate id="a3011" begin="a2911.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="3788;5292" dur="3.5s" />
        <animate id="a3012" begin="a2912.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="3578;4810" dur="3.5s" />
        <animate id="a3013" begin="a2913.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="3302;4339" dur="3.5s" />
        <animate id="a3014" begin="a2914.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3204;3992" dur="3.5s" />
        <animate id="a3015" begin="a2915.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="2964;3767" dur="3.5s" />
        <animate id="a3016" begin="a2916.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="2821;3583" dur="3.5s" />
        <animate id="a3017" begin="a2917.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="2644;3440" dur="3.5s" />
        <animate id="a3018" begin="a2918.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="2467;3168" dur="3.5s" />
        <animate id="a3019" begin="a2919.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2345;2883" dur="3.5s" />
        <animate id="a3020" begin="a2920.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2208;2407" dur="3.5s" />
        <animate id="a3021" begin="a2921.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="3.5s" />
        <animate id="a3110" begin="a3010.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="5589;3931" dur="7.5s" />
        <animate id="a3111" begin="a3011.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="5292;3788" dur="7.5s" />
        <animate id="a3112" begin="a3012.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="4810;3578" dur="7.5s" />
        <animate id="a3113" begin="a3013.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="4339;3302" dur="7.5s" />
        <animate id="a3114" begin="a3014.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3992;3204" dur="7.5s" />
        <animate id="a3115" begin="a3015.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="3767;2964" dur="7.5s" />
        <animate id="a3116" begin="a3016.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="3583;2821" dur="7.5s" />
        <animate id="a3117" begin="a3017.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="3440;2644" dur="7.5s" />
        <animate id="a3118" begin="a3018.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="3168;2467" dur="7.5s" />
        <animate id="a3119" begin="a3019.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2883;2345" dur="7.5s" />
        <animate id="a3120" begin="a3020.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2407;2208" dur="7.5s" />
        <animate id="a3121" begin="a3021.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="7.5s" />
        <animate id="a3210" begin="a3110.end" xlinkHref="#circle10" attributeName="r" repeatCount="1" fill="freeze" values="3931;3931" dur="3.5s" />
        <animate id="a3211" begin="a3111.end" xlinkHref="#circle11" attributeName="r" repeatCount="1" fill="freeze" values="3788;3788" dur="3.5s" />
        <animate id="a3212" begin="a3112.end" xlinkHref="#circle12" attributeName="r" repeatCount="1" fill="freeze" values="3578;3578" dur="3.5s" />
        <animate id="a3213" begin="a3113.end" xlinkHref="#circle13" attributeName="r" repeatCount="1" fill="freeze" values="3302;3302" dur="3.5s" />
        <animate id="a3214" begin="a3114.end" xlinkHref="#circle14" attributeName="r" repeatCount="1" fill="freeze" values="3204;3204" dur="3.5s" />
        <animate id="a3215" begin="a3115.end" xlinkHref="#circle15" attributeName="r" repeatCount="1" fill="freeze" values="2964;2964" dur="3.5s" />
        <animate id="a3216" begin="a3116.end" xlinkHref="#circle16" attributeName="r" repeatCount="1" fill="freeze" values="2821;2821" dur="3.5s" />
        <animate id="a3217" begin="a3117.end" xlinkHref="#circle17" attributeName="r" repeatCount="1" fill="freeze" values="2644;2644" dur="3.5s" />
        <animate id="a3218" begin="a3118.end" xlinkHref="#circle18" attributeName="r" repeatCount="1" fill="freeze" values="2467;2467" dur="3.5s" />
        <animate id="a3219" begin="a3119.end" xlinkHref="#circle19" attributeName="r" repeatCount="1" fill="freeze" values="2345;2345" dur="3.5s" />
        <animate id="a3220" begin="a3120.end" xlinkHref="#circle20" attributeName="r" repeatCount="1" fill="freeze" values="2208;2208" dur="3.5s" />
        <animate id="a3221" begin="a3121.end" xlinkHref="#circle21" attributeName="r" repeatCount="1" fill="freeze" values="1862;1862" dur="3.5s" />
        <text id="t1" style={{ fontFamily: "Mont-HeavyDEMO", fill: "white", fontSize: "2000px" }} x="50%" y="52.5%" dominant-baseline="middle" text-anchor="middle" font-family="Super Sans" font-weight="bold" font-style="normal">{this.state.counter === 0 ? '' : this.state.counter}</text>
      </svg>
    );
  };
}
