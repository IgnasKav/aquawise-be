data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_role" {
  name               = "ecs_role"
  assume_role_policy = "${data.aws_iam_policy_document.assume_role_policy.json}"
}

resource "aws_iam_role_policy_attachment" "ecs_role_policy" {
  role       = "${aws_iam_role.ecs_role.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "ecs_logs_policy" {
  statement {
    actions = ["logs:CreateLogGroup"]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "ecs_logs_policy" {
  name   = "ecs_logs_policy"
  policy = "${data.aws_iam_policy_document.ecs_logs_policy.json}"
}

resource "aws_iam_role_policy_attachment" "ecs_logs_policy_attachment" {
  role       = "${aws_iam_role.ecs_role.name}"
  policy_arn = "${aws_iam_policy.ecs_logs_policy.arn}"
}