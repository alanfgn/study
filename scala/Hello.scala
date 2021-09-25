object Hello {
    def main(args: Array[String]) = {
        val x: Option[String] = null

        val data = x match {
            case Some(x) => "a"
            case _ => "b"
        }

        println(data)
    }
}