import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Container, Text, VStack, Box } from "@chakra-ui/react";
import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";



const Globe = () => {
  const globeRef = useRef();

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  );
};

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <Text fontSize="xl" color="white">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </Text>
  );
};

const Index = () => {
  return (
    <Container
      centerContent
      maxW="container.md"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, gray.800, gray.900)"
    >
      <VStack spacing={4}>
        <Text fontSize="2xl" color="white" fontWeight="bold">
          teleses.ai, coming soon
        </Text>
        <Box width="100%" height="400px">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Globe />
            <OrbitControls enableZoom={false} />
            <Stars />
          </Canvas>
        </Box>
        <Countdown targetDate="Sat Jul 27 2024" />
        <Text fontSize="lg" color="white">
          countdown to demo day
        </Text>
      </VStack>
    </Container>
  );
};

export default Index;