import arg from "arg";
import inquirer from "inquirer";

type IncompleteOptions = {
  name?: string;
  dir?: string;
};

type Options = {
  name: string;
  dir: string;
};

const getOptions = (raw: string[]): IncompleteOptions => {
  const args = arg(
    {
      "--name": String,
      "--dir": String
    },
    {
      argv: raw.slice(1)
    }
  );

  return {
    name: args["--name"],
    dir: args["--dir"]
  };
};

const prompt = async (options: IncompleteOptions): Promise<Options> => {
  const questions: inquirer.Question[] = [];

  if (!options.name) {
    questions.push({
      type: "input",
      name: "name"
    });
  }

  if (!options.dir) {
    questions.push({
      type: "input",
      name: "dir"
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    name: options.name || answers.name,
    dir: options.dir || answers.dir
  };
};

export const cli = async (raw: string[]) => {
  const incompleteOptions = getOptions(raw);
  const options = await prompt(incompleteOptions);

  console.log("Seeder created successfully");
};
