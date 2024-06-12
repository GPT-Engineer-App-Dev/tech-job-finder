import { useParams } from "react-router-dom";
import { Container, Heading, Text, VStack, Box } from "@chakra-ui/react";

const jobDetails = {
  1: { title: "Frontend Developer", category: "Engineering", description: "Develop and maintain user interfaces." },
  2: { title: "Product Manager", category: "Product", description: "Oversee product development from start to finish." },
  3: { title: "UI/UX Designer", category: "Design", description: "Design user interfaces and experiences." },
  4: { title: "Backend Developer", category: "Engineering", description: "Develop and maintain server-side logic." },
  5: { title: "Product Designer", category: "Design", description: "Design products with a focus on user experience." },
};

const JobDetails = () => {
  const { id } = useParams();
  const job = jobDetails[id];

  if (!job) {
    return (
      <Container maxW="container.lg" py={10}>
        <Heading as="h1" size="2xl" textAlign="center">
          Job Not Found
        </Heading>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          {job.title}
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Category: {job.category}
        </Text>
        <Box p={5} shadow="md" borderWidth="1px">
          <Text mt={4}>{job.description}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default JobDetails;