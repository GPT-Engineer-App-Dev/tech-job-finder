import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Container, VStack, Text, Select, Heading, SimpleGrid, Card, CardBody, Button } from "@chakra-ui/react";
import { useJobs, useDeleteJob } from "../integrations/supabase/index.js"; // Import the useJobs and useDeleteJob hooks
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx"; // Import the useSupabaseAuth hook

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const { session } = useSupabaseAuth(); // Get the session from Supabase Auth
  const deleteJobMutation = useDeleteJob(); // Initialize the delete job mutation
  const { data: jobs, error, isLoading } = useJobs(); // Fetch jobs from Supabase

  const handleDelete = (id) => {
    deleteJobMutation.mutate(id); // Function to handle job deletion
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }

  const filteredJobs = selectedCategory
    ? jobs.filter((job) => job.job_area === selectedCategory)
    : jobs;

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Remote Tech Jobs
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Find your next remote job in tech. Filter by category to get started.
        </Text>
        <Select
          placeholder="Filter by category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Product">Product</option>
          <option value="Design">Design</option>
          <option value="Engineering">Engineering</option>
        </Select>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {filteredJobs.map((job) => (
            <Card key={job.id} borderWidth="1px" borderRadius="lg">
              <CardBody>
                <Heading as="h3" size="md">
                  <Link to={`/job/${job.id}`}>{job.jobs_title}</Link>
                </Heading>
                <Text mt={2}>{job.job_area}</Text>
              {session && session.user.is_admin && ( // Show delete button if user is admin
                  <Button
                    mt={4}
                    colorScheme="red"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </Button>
                )}
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;