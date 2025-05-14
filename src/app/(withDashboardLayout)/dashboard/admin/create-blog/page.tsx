import Container from "@/components/Shared/Container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const BlogPage = () => {
  return (
    <Container className="py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Blog
        </Button>
      </div>
    </Container>
  );
};

export default BlogPage;
