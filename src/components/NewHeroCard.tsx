import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

const NewHeroCard = () => {
  return (
    <Card>
      <Link to={`/superheroes/new`}>
        <CardHeader>
          <CardTitle>Create New</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Link>
    </Card>
  );
};

export default NewHeroCard;
