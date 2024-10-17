"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface TimelineEvent {
  date: string;
  message: string;
  images: string[];
  rotation: number;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "25 Iulie 2023",
    message:
      "Primele poze pe care le avem de când suntem împreună. Eu chiar voiam să fac poze cu tine dar îmi era frică să nu ți se pară cringe :P",
    images: ["/images/first.JPG", "/images/second.JPG"],
    rotation: -3,
  },
  {
    date: "30 August 2023",
    message:
      "Aici erai în Grecia, iar eu râdeam de tine ca esti portocala mea 🍊",
    images: ["/images/third.JPG"],
    rotation: 2,
  },
  {
    date: "16 Septembrie 2023",
    message:
      "Aici faceam misto de tine că arăți ca Alvin. Tocmai iti scosesesi măseaua de minte și mie mi se părea că erai așa de drăguță!!!!",
    images: [
      "/images/4.JPG",
      "/images/5.JPG",
      "/images/6.JPG",
      "/images/7.JPG",
      "/images/8.JPG",
      "/images/9.JPG",
    ],
    rotation: -1,
  },
  {
    date: "25 Septembrie 2023",
    message:
      "Asta este una dintre pozele mele preferate cu tine. Nu știu ce e cu poza asta, dar era așa frumoasă! Și să știi că încă sunt supărat că nu porți tricoul ăsta cu mine",
    images: ["/images/10.JPG"],
    rotation: 3,
  },
  {
    date: "14 Octombrie 2023",
    message:
      "Ce zi frumoasă a fost asta, iar tu erai îmbrăcata super cutsie! Știu că și ție îți plac pozele astea pentru că te-am complimentat mult ziua aia si te simteai frumoasa (nu pre esti in general).",
    images: [
      "/images/11.JPG",
      "/images/12.JPG",
      "/images/13.JPG",
      "/images/14.JPG",
    ],
    rotation: 2,
  },
  {
    date: "21 Octombrie 2023",
    message:
      "Astea sunt niște poze pe care nu cred că le-ai văzut până acum. Sunt de atunci când voiam să îți fac brățară și ma gândeam la un design. Afurisitul ăla de la gravură nu m-a lăsat să o fac așa, dar eu zic că a ieșit destul de bine. Sunt cel mai fericit când te văd că o porți.",
    images: [
      "/images/15.JPEG",
      "/images/16.JPEG",
      "/images/17.JPEG",
      "/images/18.JPEG",
      "/images/19.JPEG",
    ],
    rotation: -3,
  },
  {
    date: "26 Octombrie 2023",
    message:
      "ASTEA SUNT FIX DE ANUL TRECUT!!!!! Sper că anul ăsta să facem poze și mai mișto pentru că astea sunt unele dintre preferatele mele!! Poza aia când te uitai la lună a fost prima poza de fundal pe care am avut-o cu tine. Cea mai frumoasă iubită și cea mai frumoasă noapte! (stiu ca e cringe dar TACI)",
    images: [
      "/images/20.JPG",
      "/images/21.JPG",
      "/images/22.JPG",
      "/images/23.JPG",
      "/images/24.JPG",
      "/images/25.JPG",
      "/images/26.JPG",
      "/images/27.JPG",
    ],
    rotation: -1,
  },
  {
    date: "31 Octombrie 2023",
    message:
      "Una dintre zilele mele preferate cu tine, mi-o amintesc și acum foarte bine. A fost pentru prima oară când te-am văzut și am fost înnebunit. De aia ți-am și făcut tricoul ăla despre ea, pentru ca a insemnat foarte mult pentru mine sa te vad asa. Te iubesc prostuțo, și hei, chiar nu mi s-au părut mici : P",
    images: [
      "/images/28.JPG",
      "/images/29.JPG",
      "/images/30.JPG",
      "/images/31.JPG",
      "/images/32.JPG",
      "/images/33.JPG",
      "/images/34.JPG",
      "/images/35.JPG",
      "/images/36.JPG",
      "/images/37.JPG",
      "/images/38.JPG",
      "/images/39.JPG",
      "/images/40.JPG",
      "/images/41.JPG",
      "/images/42.JPG",
      "/images/43.JPG",
      "/images/44.JPG",
      "/images/45.JPG",
      "/images/46.JPG",
      "/images/47.JPG",
      "/images/48.JPG",
      "/images/49.JPG",
      "/images/50.JPG",
      "/images/51.JPG",
      "/images/52.JPG",
      "/images/53.JPG",
      "/images/54.JPG",
      "/images/55.JPG",
      "/images/56.JPG",
      "/images/57.JPG",
      "/images/58.JPG",
      "/images/59.JPG",
      "/images/60.JPG",
    ],
    rotation: 4,
  },
  {
    date: "2 Noiembrie 2023",
    message:
      "Aria TNB. Eram amândoi frumoși. Eu nu le am pe alea cu mine. POATE IMI DAI SI MIE SHARE LA ALBUM CU MI-AI PROMIS",
    images: [
      "/images/61.JPG",
      "/images/62.JPG",
      "/images/63.JPG",
      "/images/64.JPG",
      "/images/65.JPG",
      "/images/66.JPG",
      "/images/67.JPG",
    ],
    rotation: -2,
  },
  {
    date: "26 Noiembrie 2023",
    message:
      "Ne-a luat ciudatul ăla de Remus bilete. A fost cam cringe, dar m-am simțit foarte bine pentru că eram cu tine.",
    images: ["/images/68.JPG", "/images/69.JPG"],
    rotation: 3,
  },
  {
    date: "1 Decembrie 2023",
    message:
      "ZIUA ROMÂNIEI!! Nu am mai apucat să mergem la fanfară pentru că te-ai supărat cu maica-ta, dar am fost la the Moon și eu mi-am băut cafeluța iar tu ai mâncat Eggs Benedict. Îmi părea așa de rău când te-am văzut toată plânsa, imi venea numai sa te pup.",
    images: ["/images/70.JPG", "/images/71.JPG"],
    rotation: 3,
  },
  {
    date: "16 Decembrie 2023",
    message:
      "Aici am fost singur să caut pulovere cringe, nu am găsit ce căutam, dar hey, ale noastre au fost drăguțe! Trebuie să recunoști!",
    images: ["/images/72.JPG"],
    rotation: -4,
  },
  {
    date: "17 Decembrie 2023",
    message: "Remember this? Fun times!!",
    images: ["/images/73.JPG", "/images/74.JPEG"],
    rotation: -2,
  },
  {
    date: "21 Decembrie 2023",
    message:
      "Nu am băut mult, dar eu mă cam ametisem. Ne-am distrat amândoi super mult, iar eu am făcut poza aia super cutsie împreună, dar ție ți s-a părut că erai uratică așa că nu m-ai lăsat să o folosesc ca lock screen :/. După ce am mâncat kürtos colac (pentru că m-a învățat o prostuță ca asa se zice) am fost la patinoar unde cânta Vunk - PLEACĂ, MÂINE O SĂ-ȚI TREACĂ",
    images: [
      "/images/75.JPG",
      "/images/76.JPG",
      "/images/77.JPG",
      "/images/78.JPG",
    ],
    rotation: 3,
  },
  {
    date: "28 Decembrie 2023",
    message:
      "Ne-am cam supărat în ziua asta. Îți spusesem că o fosta colegă a zis că pot mai mult. Ți-am zis-o de prost, am vrut să te necajesc putin, dar tu te-ai suparat foc. Eu deja știam că îmi găsisem iubirea și sufletul pereche. De la început eram mai prostuț :/",
    images: [
      "/images/80.jpg",
      "/images/81.jpg",
      "/images/82.jpg",
      "/images/83.jpg",
    ],
    rotation: -2,
  },
  {
    date: "1 Ianuarie 2024",
    message:
      "HAPPY NEW YEARS!!!!! Ce beat eram când te-am pus să faci poza aia pentru părinți. Noaptea asta a însmenat foarte mult pentru amândoi. Am făcut ceva ce nu am crezut niciodată posibil. Totuși am făcut-o, și m-a marcat foarte mult. Am fost foarte dezamăgit de mine și nu îmi pot imagina cum te-ai simți tu. Totuși, am trecut peste și ne-a apropiat, m-a făcut să te prețuiesc mai mult și să te iubesc infinit.",
    images: ["/images/85.JPG", "/images/86.jpg", "/images/87.jpg"],
    rotation: -2,
  },
  {
    date: "3 Ianuarie 2024",
    message:
      "Am fost la tine si ti-am facut unghiutele, eu zic ca au iesit mai bine decat cum ti le faci tu, dar whatever!!! Am facut si florile din lego pe care ti le-am luat, iar ce sa vezi, eu m-am descurcat si la asta mai bine ca tine. PS: CAND FACEM LEGO-UL PE CARE MI L-AI LUAT MIE?!?!?",
    images: [
      "/images/88.jpeg",
      "/images/89.JPG",
      "/images/90.JPG",
      "/images/91.JPG",
    ],
    rotation: 3,
  },
];

const ScotchTape = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute w-16 h-6 bg-pink-200 opacity-70 transform -rotate-45 z-0 ${className}`}
    style={{
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)",
    }}
  ></div>
);

const ImageCarousel = ({
  images,
  message,
}: {
  images: string[];
  message: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setDirection(Math.random() > 0.5 ? 1 : -1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const imageVariants = {
    enter: (direction: number) => ({
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0.8,
      rotateZ: 0,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: (direction: number) => ({
      x: direction * 300,
      y: direction * 150,
      opacity: 0,
      scale: 0.5,
      rotateZ: direction * 45,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div
      className="w-48 h-64 relative cursor-pointer"
      onClick={nextImage}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          nextImage(e as unknown as React.MouseEvent);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Image carousel for ${message}. Click to view next image.`}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${message} - Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            priority={currentIndex === 0}
            loading={currentIndex === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      </AnimatePresence>
      <ScotchTape className="-top-3 -left-3" />
      <ScotchTape className="-bottom-3 -right-3 rotate-180" />
      <div className="absolute bottom-1 right-1 bg-white bg-opacity-70 px-1 py-0.5 rounded text-xs">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

const AnimatedThread = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pathHeight, setPathHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    if (containerRef.current) {
      setPathHeight(containerRef.current.scrollHeight);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2"
    >
      <svg
        className="h-full w-48 overflow-visible"
        style={{
          position: "absolute",
          top: 0,
          left: "-24px",
          height: pathHeight,
        }}
      >
        <motion.path
          d={`M24,0 C24,${pathHeight * 0.25} 72,${pathHeight * 0.5} 24,${pathHeight * 0.75} C-24,${pathHeight} 72,${pathHeight} 24,${pathHeight}`}
          fill="none"
          stroke="#0d9488"
          strokeWidth="2"
          style={{ pathLength, opacity: pathOpacity }}
        />
      </svg>
    </div>
  );
};

export default function ExtendedThreadTimeline() {
  return (
    <div className="max-w-[393px] mx-auto p-4 bg-gradient-to-b from-teal-50 to-teal-100 min-h-screen font-serif">
      <h1 className="text-4xl font-bold text-center mb-6 text-teal-800 z-10 font-sans">
        Povestea noastră de dragoste
      </h1>

      <h3 className="text-2xl font-bold text-center mb-8 text-teal-800 z-10 italic">
        La mulți ani, Miri! 🎉🎂🎈
      </h3>

      <p className="text-lg text-center mb-8 text-teal-700 z-10 leading-relaxed">
        Vreau să fii fericită și să ajungi cea mai tare arhitectă pe care a
        văzut-o universul ăsta!
      </p>

      <p className="text-lg text-center mb-8 text-teal-700 z-10 leading-relaxed">
        Vreau să îți fiu alături și să te văd cum crești. Nu ai idee cât te
        admir când te văd că indiferent de cum te simți, de cum e ziua ta, tu
        continui să lucrezi către visul tău.
      </p>

      <p className="text-lg text-center mb-8 text-teal-700 z-10 leading-relaxed">
        Am vrut să fac asta pentru că te văd mult prea des cum depui efort să ne
        amintim de tot drumul. Sper să ți se pară cutsie ...
      </p>

      <p className="text-xl font-bold text-center mb-8 text-teal-800 z-10">
        Pregătește-te pentru că începem ...
      </p>

      <div className="relative">
        <AnimatedThread />
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            className="mb-12 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-3 bg-teal-50 bg-opacity-80 backdrop-blur-sm p-4 rounded-lg shadow-md relative z-10">
              <div className="font-semibold text-teal-700 text-sm mb-2">
                {event.date}
              </div>
              <div className="text-base font-medium text-teal-900 px-4 break-words leading-relaxed">
                {event.message}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <motion.div
                className="bg-white p-1 shadow-lg inline-block relative z-10 rounded-lg"
                style={{ transform: `rotate(${event.rotation}deg)` }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ImageCarousel images={event.images} message={event.message} />
              </motion.div>
            </div>
          </motion.div>
        ))}
        <div className="text-center mb-8 bg-teal-50 bg-opacity-80 backdrop-blur-sm p-6 rounded-lg shadow-md relative z-10">
          <p className="text-lg text-teal-800 mb-4 leading-relaxed">
            Hey, cam până aici am reușit să fac până ne-am despărțit. Acum e
            joi. Știu că nu am arătat-o în ultimul timp, dar țin la tine enorm
            de mult și nu îmi pot imagina o viață din care tu să nu faci parte.
            Știu că nu au fost cele mai bune luni ale noastre. Știu că acum
            poate par disperat sau penibil, dar nu-mi pasă! Vreau să mai încerc
            încă o dată, o singură dată. Poate nu mă mai iubești, dar
            sentimentele mele au rămas neschimbate, neschimbate de cele de acum
            un an.
          </p>
          <p className="text-2xl font-bold text-teal-900 mb-4">
            TE IUBESC, MIRUNA!!!
          </p>
          <p className="text-lg text-teal-800 leading-relaxed">
            Aș striga-o oriunde dacă te-ar face să mă mai iubești încă o dată.
            Vreau să îți arăt cât de mult contezi pentru mine, cât de importantă
            ești pentru mine. De aceea o să mai încerc o singură dată, și după
            asta o să te las în pace. Am înțeles mesajele tale de până acum dar
            eu ...
          </p>
        </div>
        <h1 className="text-4xl font-bold text-center mb-6 text-teal-800 z-10">
          Te iubesc. Simplu. Infinit!
        </h1>
        <p className="text-sm font-medium text-center mb-8 text-teal-700 z-10 italic">
          PS: stiu ca e cringe rau tot ce zic, dar și noi suntem cringe!!!
        </p>
      </div>
    </div>
  );
}
