import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Heading } from '@chakra-ui/react';
import { SupabaseAuthUI, useSupabaseAuth } from '../integrations/supabase/auth.jsx';

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <Container centerContent>
      <Box p={6} rounded="md" w="100%" maxW="md">
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          Admin Login
        </Heading>
        <SupabaseAuthUI />
      </Box>
    </Container>
  );
};

export default Login;