declare module 'react-responsive-carousel' {
    import React from 'react';
  
    export interface CarouselProps {
      showThumbs?: boolean;
      autoPlay?: boolean;
      infiniteLoop?: boolean;
      showArrows?: boolean;
      // Add more props as needed
    }
  
    export class Carousel extends React.Component<CarouselProps> {}
  }
  