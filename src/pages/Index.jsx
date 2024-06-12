import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Container, VStack, Text, Select, Heading, SimpleGrid, Card, CardBody, Button } from "@chakra-ui/react";
import { useJobs, useDeleteJob, supabase } from "../integrations/supabase/index.js"; // Import the useJobs, useDeleteJob hooks, and supabase
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx"; // Import the useSupabaseAuth hook
import { useQueryClient } from "@tanstack/react-query"; // Import useQueryClient from react-query

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const queryClient = useQueryClient(); // Initialize the query client
  const { session, setSession } = useSupabaseAuth(); // Get the session from Supabase Auth

  useEffect(() => {
    const fetchProfile = async () => {
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();
        setSession({ ...session, user: { ...session.user, is_admin: profile.is_admin } });
      }
    };
    fetchProfile();
  }, [session]);
  const deleteJobMutation = useDeleteJob(); // Initialize the delete job mutation
  const { data: jobs, error, isLoading } = useJobs(); // Fetch jobs from Supabase

  useEffect(() => {
    if (deleteJobMutation.isSuccess) {
      queryClient.invalidateQueries('jobs');
    }
  }, [deleteJobMutation.isSuccess, queryClient]);

  const handleDelete = async (id) => {
    try {
      await deleteJobMutation.mutateAsync(id);
      alert('Job deleted successfully');
    } catch (error) {
      alert('Error deleting job: ' + error.message);
    }
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
              {session && session.user.is_admin && (
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