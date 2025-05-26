import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColors } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface BuddysListProps {
  title: string;
  buddys?: Array<{
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
  }>;
  classNames?: string;
}

const BuddysList = ({ title, buddys, classNames }: BuddysListProps) => {
  return (
    <article className={cn("companion-list", classNames)}>
      <h2 className="text-3xl font-bold mb-1">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buddys?.map(({ id, name, subject, duration, topic }) => (
            <TableRow key={id}>
              <TableCell className="font-medium">
                <Link
                  href={`/buddys/${id}`}
                  className="flex items-center gap-2"
                >
                  <div className="flex flex-center gap-2">
                    <div
                      className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                      style={{ backgroundColor: getSubjectColors(subject) }}
                    >
                      <Image
                        src={`/icons/${subject.toLowerCase()}.svg`}
                        alt={subject}
                        width={35}
                        height={35}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-2xl">{name}</p>
                      <p className="text-lg">{topic}</p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div className="subject-badge w-fit max-md:hidden">
                  {subject}
                </div>
                <div
                  className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                  style={{ backgroundColor: getSubjectColors(subject) }}
                >
                  <Image
                    src={`/icons/${subject}.svg`}
                    alt={subject}
                    width={18}
                    height={18}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 w-full">
                  <p className="text-2l">
                    {duration} <span className="max-md:hidden">mins</span>
                  </p>
                  <Image
                    src="/icons/clock.svg"
                    alt="Clock Icon"
                    width={14}
                    height={14}
                    className="max-md:hidden"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default BuddysList;
