import React from 'react';
import { Carousel } from 'antd';
import AdminImage from  '../../public/Admin-1.jpg'
import StuImage from  '../../public/stu.png'
import StuImage1 from  '../../public/std-1.png'


const contentStyle: React.CSSProperties = {
  height: '500px',
  width: '100%',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const CarouselAuto= () => (
  <Carousel autoplay>
    <div>
      <img style={contentStyle} src={AdminImage} alt="bappa" />
    </div>
    <div>
      <img style={contentStyle} src={StuImage} alt="bappa" />
    </div>
    <div>
    <img style={contentStyle} src={StuImage1} alt="bappa" />
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

export default CarouselAuto;