import { useParams } from "react-router-dom";
import { Container, Heading, Text, VStack, Box } from "@chakra-ui/react";
import { useJob } from "../integrations/supabase/index.js"; // Import the useJob hook

const JobDetails = () => {
  const { id } = useParams();
  const { data: job, error, isLoading } = useJob(id); // Fetch job from Supabase

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Container maxW="container.lg" py={10}>
        <Heading as="h1" size="2xl" textAlign="center">
          Error loading job: {error.message}
        </Heading>
      </Container>
    );
  }

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
          {job.jobs_title}
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Category: {job.job_area}
        </Text>
        <Box p={5} shadow="md" borderWidth="1px">
          <Text mt={4}>Type: {job.job_type}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default JobDetails;