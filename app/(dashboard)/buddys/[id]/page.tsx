interface PageProps {
  params: {
    id: string;
  };
}

const page = ({ params }: PageProps) => {
  const { id } = params;
  return <div>page {id}</div>;
};

export default page;
