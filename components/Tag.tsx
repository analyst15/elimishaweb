import { Badge } from './ui/badge';
import { TagIcon } from 'lucide-react';

interface TagProps {
  tag: string;
}

export function Tag({ tag }: TagProps) {
  return (
    <Badge variant="outline">
      <TagIcon className="mr-1 h-3 w-3" />
      {tag}
    </Badge>
  );
}
