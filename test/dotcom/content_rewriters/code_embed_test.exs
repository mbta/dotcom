defmodule Dotcom.ContentRewriters.CodeEmbedTest do
  use ExUnit.Case

  import Dotcom.ContentRewriters.CodeEmbed

  describe "rewrite/1" do
    test "finds <tableau-viz> and adds a token attribute" do
      content =
        {:safe,
         ~s(<script type='module' src='https://us-east-1.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://us-east-1.online.tableau.com/t/mbta-public/views/EmbedTestDashboard/TestingDashboard' width='1730' height='965' hide-tabs toolbar='bottom'></tableau-viz>)}

      {:safe, rewritten} = rewrite(content)
      {:ok, fragment} = Floki.parse_fragment(rewritten)
      [{_, attrs, _}] = Floki.find(fragment, "tableau-viz")
      assert Enum.find(attrs, fn {name, _} -> name == "token" end)
    end

    test "passes through other code embeds" do
      input_code = ~s(<a href="#{Faker.File.file_name()}"><kbd>ABCD</kbd></a>)
      {:safe, rewritten} = rewrite({:safe, input_code})
      assert rewritten == input_code
    end
  end
end
