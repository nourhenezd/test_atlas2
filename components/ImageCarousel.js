import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useState, useEffect, useCallback } from 'react';

export default function ImageCarousel({ images }) {
  // emblaRef will be a reference to our carousel viewport
  const [emblaRef, embla] = useEmblaCarousel(
    {
      align: 'start',
      // aligns the first slide to the start
      // of the viewport else will align it to the middle.

      loop: true,
      // we need the carousel to loop to the
      // first slide once it reaches the last slide.

      skipSnaps: false,
      // Allow the carousel to skip scroll snaps if
      // it's dragged vigorously.

      inViewThreshold: 0.7,
      // percentage of a slide that need's to be visible
      // inorder to be considered in view, 0.7 is 70%.
    }[Autoplay({ delay: 10000, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);
  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // this function allow's us to scroll to the slide whose
  // id correspond's to the id of the navigation dot when we
  // click on it.

  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  // set the id of the current slide to active id
  // we need it to correctly highlight it's corresponding
  // navigation dot.

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  // make sure embla is mounted and return true operation's
  // can be only performed on it if it's successfully mounted.

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((url) => (
            <div
              className="relative flex flex-none flex-wrap lg:flex-nowrap w-full h-96 mx-10 "
              key={url.name}
            >
              <div className="relative overflow-hidden cursor-pointer w-full">
                <Image
                  src={`https://live.staticflickr.com/65535/` + url.name}
                  layout="fill"
                  className="object-cover rounded-lg"
                  alt="Image de la region"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-5 space-x-2">
        {scrollSnaps.map((_, idx) => (
          <button
            className={`w-2 h-2 rounded-full ${
              idx === selectedIndex ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            key={idx}
            onClick={() => scrollTo(idx)}
          />
        ))}
      </div>
      {/* <div className="p-5 rounded-lg" type="button" onClick={scrollNext}>
        Next
      </div>
      <div className="p-5 rounded-lg" type="button" onClick={scrollPrev}>
        Previous
      </div> */}
    </div>
  );
}
