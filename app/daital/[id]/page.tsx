import { getMovieDetail } from "@/app/utils/get-data";

type DetailDynamicPageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: DetailDynamicPageProps) => {
  const dynamicParams = await params;
  const id = dynamicParams.id;
  const movieDetailData = await getMovieDetail(id);

  return {
    title: `MovieZ | ${movieDetailData.title}`,
  };
};

const DetailDynamicPage = async ({ params }: DetailDynamicPageProps) => {
  const dynamicParams = await params;
  const id = dynamicParams.id;
  const movieDetailData = await getMovieDetail(id);

  console.log(movieDetailData);

  return <div className="text-2xl font-bold">{movieDetailData.title}</div>;
};

export default DetailDynamicPage;